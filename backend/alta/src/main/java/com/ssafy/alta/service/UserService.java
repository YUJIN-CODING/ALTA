package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.UserUpdateRequest;
import com.ssafy.alta.dto.response.UserResponse;
import com.ssafy.alta.dto.response.UserSearchResponse;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.gitutil.GitEmailAPI;
import com.ssafy.alta.gitutil.GitReadmeAPI;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.util.UserLanguage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final StudyJoinInfoRepository studyJoinInfoRepository;
    private final RedisService redisService;

    private final GitEmailAPI gitEmailAPI = new GitEmailAPI();
    private final GitReadmeAPI gitReadmeAPI = new GitReadmeAPI();

    private UserLanguage userLanguage;
    private final Environment environment;

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String username) {
        return Optional.ofNullable(userRepository.findByName(username));
    }

    public String getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return "인증 정보를 찾을 수 없습니다.";// 추후 exception으로 만들어 던지가
        }

        String userId = null;
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            userId = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            userId = (String) authentication.getPrincipal();
        }

        return userId;
    }

    public List<UserSearchResponse> selectUserName(String word) {
        List<UserSearchResponse> userInfo = userRepository.findByNickNameOrderByNickName(word);

        if (userInfo.size() == 0)
            throw new DataNotFoundException();

        return userInfo;
    }

    @Transactional
    public UserResponse updateUserImage(MultipartFile file) {
        String user_id = this.getCurrentUserId();
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));
        User user = optUser.get();
        // 이미지 저장
        String filename = UUID.randomUUID() + file.getOriginalFilename();
        String imagePath = environment.getProperty("image.basePath") + filename;
        try {
            file.transferTo(new File(imagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }

        User newUser = new User().builder()
                .nickname(user.getNickname())
                .email(user.getEmail())
                .id(user_id)
                .image(user.getImage())
                .introduction(user.getIntroduction())
                .language(user.getLanguage())
                .name(user.getName())
                .role(user.getRole())
                .siteAlert(user.getSiteAlert())
                .emailAlert(user.getEmailAlert())
                .image(environment.getProperty("image.urlBasePath") + filename)
                .build();

        userRepository.save(newUser);
        return this.selectUser();
    }

    @Transactional
    public UserResponse updateAlert(int alertSetting) {
        String user_id = this.getCurrentUserId();
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));
        User exUser = optUser.get();
        String tmpLen = Integer.toBinaryString(alertSetting);
        while (tmpLen.length() != 4)
            tmpLen = "0" + tmpLen;
        char[] list = tmpLen.toCharArray();
        System.out.println(tmpLen);
        // 이메일 일정, 코멘트, 풀이 // 알림 일정, 코멘트, 풀이
        boolean[] alertList = new boolean[4];
        for (int i = 3; i >= 0; i--) {

            if (list[i] == '1')
                alertList[i] = true;

        }
        System.out.println(Arrays.toString(alertList));
        int emailSum = 0;
        int alertSum = 0;
        for (int i = 0; i < 2; i++) {
            if (alertList[1 - i])
                emailSum += (int) Math.pow(2, i);
            if (alertList[3 - i])
                alertSum += (int) Math.pow(2, i);
        }

        User newUser = new User().builder()
                .nickname(exUser.getNickname())
                .email(exUser.getEmail())
                .id(user_id)
                .image(exUser.getImage())
                .introduction(exUser.getIntroduction())
                .language(exUser.getLanguage())
                .name(exUser.getName())
                .role(exUser.getRole())
                .siteAlert(alertSum)
                .emailAlert(emailSum)
                .build();
        userRepository.save(newUser);
        return this.selectUser();

    }

    @Transactional(rollbackFor = Exception.class)
//    public UserResponse updateUser(UserUpdateRequest userUpdateRequest, MultipartFile file) {
    public UserResponse updateUser(UserUpdateRequest userUpdateRequest) {
        String user_id = this.getCurrentUserId();

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));
        User exUser = optUser.get();

        String[] langlist = userUpdateRequest.getLanguageList();

        HashMap<String, Integer> langStringMap = userLanguage.getLangStringMap();
        int sum = 0;
        for (String langString : langlist) {
            if (langStringMap.containsKey(langString))
                sum += langStringMap.get(langString);
            System.out.println(langString + " : " + langStringMap.get(langString));
        }


        // 받은 정보로 유저 정보 업데이트
        User newUser = new User().builder()
                .nickname(userUpdateRequest.getNickname())
                .email(userUpdateRequest.getEmail())
                .id(user_id)
//                .image(imagePath)
                .introduction(userUpdateRequest.getIntroduction())
                .language(sum)
                .name(exUser.getName())
                .role(exUser.getRole())
                .siteAlert(userUpdateRequest.getSiteAlert())
                .emailAlert(userUpdateRequest.getEmailAlert())
                .build();
        userRepository.save(newUser);

        // 유저 정보 불러서 리턴
        return this.selectUser();
    }

    @Transactional
    public UserResponse selectUser() {
        String userId = this.getCurrentUserId();
        String token = redisService.getAccessToken(userId);
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        User user = optUser.get();

        UserResponse userResponse = new UserResponse();
        userResponse.setUserData(new HashMap<>());

        List<StudyJoinInfo> sjiList = studyJoinInfoRepository.findByUserId(user.getId());

        String gitEmailData = gitEmailAPI.selectGithubEmail(token);


        ArrayList<HashMap<String, Object>> arrayStudyList = new ArrayList<>();
        for (StudyJoinInfo sji : sjiList) {
            if (!sji.getState().equals("가입"))
                continue;
            HashMap<String, Object> tmp = new HashMap<>();
            Study tmpStudy = sji.getStudy();
            tmp.put("id", tmpStudy.getStudyId());
            tmp.put("name", tmpStudy.getName());
            tmp.put("introduction", tmpStudy.getIntroduction());
            tmp.put("language", tmpStudy.getLanguage());
            tmp.put("maxPeople", tmpStudy.getMaxPeople());
            tmp.put("joined", studyJoinInfoRepository.countStudyJoinInfoByStateAndStudyStudyId("가입", tmpStudy.getStudyId()));

            arrayStudyList.add(tmp);
        }

        char[] lnum = Integer.toBinaryString(user.getLanguage() == null ? 0 : user.getLanguage()).toCharArray();
        int lnumIdx = 0;
        ArrayList<String> langStringList = new ArrayList<>();
        while (lnum.length > lnumIdx) {
            if (lnum[lnumIdx] == '1')
                langStringList.add((String) userLanguage.getLangIdxMap().get((int) Math.pow(2, lnum.length - 1 - lnumIdx)));
            lnumIdx++;
        }

        if (langStringList.size() == 0)
            langStringList = null;

        userResponse.getUserData().put("nickname", user.getNickname());
        userResponse.getUserData().put("githubMail", gitEmailData); // 유저 github 정보로부터 이메일 가져오기
        userResponse.getUserData().put("email", user.getEmail());
        userResponse.getUserData().put("emailAlert", user.getEmailAlert());
        userResponse.getUserData().put("siteAlert", user.getSiteAlert());
        userResponse.getUserData().put("introduction", user.getIntroduction() == null ? "" : user.getIntroduction());
        userResponse.getUserData().put("time", user.getActivityTime());
        userResponse.getUserData().put("languageList", langStringList);
        userResponse.getUserData().put("profileUrl", user.getImage());
        userResponse.getUserData().put("studyList", arrayStudyList);

        return userResponse;
    }
}
