package com.ssafy.alta.jwt;

import com.ssafy.alta.exception.JwtExpiredExaception;
import com.ssafy.alta.service.RedisService;
import com.ssafy.alta.service.UserService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

/**
 * packageName 	: com.ssafy.alta.jwt
 * fileName 	: TokenProvider
 * author 	    : 오서하
 * date		    : 2022-04-28
 * description	: jwt 토큰 생성하기 위한 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    오서하  		    최초 생성
 */

@Component
@RequiredArgsConstructor
public class TokenProvider implements InitializingBean {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private static final String AUTHORITIES_KEY = "auth";
    private final Environment environment;
    private Key key;
    private final RedisService redisService;
    private final UserService userService;


    //    implements InitializingBean
//    afterPropertiesSet()` 을 오버라이드 한 이유는
//    BEAN이 생성이 되고 주입을 받은 후에 secret값을 Base64 Decode해서 Key 변수에 할당
    @Override
    public void afterPropertiesSet() {
                String secret = environment.getProperty("jwt.secret");
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date issuedTime = new Date();
        Long exp = Long.valueOf(environment.getProperty("jwt.access-token-validity-in-seconds"));
        Date validity = new Date(now + exp);

        return Jwts.builder()
                .setSubject(authentication.getName()) // github_id
                .setIssuedAt(issuedTime) // 토큰발행 시간
                .claim(AUTHORITIES_KEY, "ROLE_USER")
                .signWith(key, SignatureAlgorithm.HS512) //// 암호화 알고리즘, secret 값
                .setExpiration(validity) // 토큰만료 시간
                .compact();
    }

    public String createRefreshToken(Authentication authentication) {

        long now = (new Date()).getTime();
        Date issuedTime = new Date();
        Long exp = Long.valueOf(environment.getProperty("jwt.refresh-token-validity-in-seconds"));
        Date validity = new Date(now + exp);

        return Jwts.builder()
                .setSubject(authentication.getName()) // github_id
                .setIssuedAt(issuedTime) // 토큰발행 시간
                .claim(AUTHORITIES_KEY, "ROLE_USER")
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity) // 토큰 만료 시간
                .compact();
    }

    // 인증 성공시 SecurityContextHolder에 저장할 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }


    public boolean validateToken(String token)  {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("Invalid JWT signature."); // 잘못된 JWT 서명입니다.
            throw new JwtException("JWT error");
        } catch (ExpiredJwtException e) {
            logger.info("Expired JWT token."); // 만료된 JWT 토큰입니다.
            throw new JwtExpiredExaception();
        } catch (UnsupportedJwtException e) {
            logger.info("Unsupported JWT token."); // 지원되지 않는 JWT 토큰입니다.
            throw new JwtException("JWT error");
        } catch (IllegalArgumentException e) {
            logger.info("JWT token compact of handler are invalid."); // JWT 토큰이 잘못되었습니다.
            throw new JwtException("JWT error");
        }
    }

    public boolean compareWithRedisData(String token){
        String userId = userService.getCurrentUserId();
        String storedRT = redisService.getJWTRefreshToken(userId);
        if(storedRT.equals(token))
            return true;
        return false;
    }



}