package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.UserResponse;
import com.sun.istack.NotNull;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: User
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
@ToString
public class User {
    @Id
    @Column(name = "user_id")
    private String id;

    @NotNull
    @Column(name = "user_name")
    private String name;

    @NotNull
    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_email_alert")
    private Integer emailAlert;

    @Column(name = "user_site_alert")
    private Integer siteAlert;

    @Column(name = "user_introduction")
    private String introduction;

    @Column(name = "user_activity_time")
    private String activityTime;

    @Column(name = "user_language")
    private Integer language;

    @Column(name = "user_image")
    private String image;

    @Column(name = "user_role")
    private String role;

    public void updateImageUrl(String imageUrl) {
        this.image = imageUrl;
    }

    public void updateInfo(int sum, String nick, String email, String introduction) {
        this.language = sum == 0 ? null : sum;
        this.nickname = nick;
        this.email = email;
        this.introduction = introduction;
    }

    public void updateAlert(int email, int site) {
        this.emailAlert = email;
        this.siteAlert = site;
    }

}

