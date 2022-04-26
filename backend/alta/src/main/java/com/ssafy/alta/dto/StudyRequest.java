package com.ssafy.alta.dto;

import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: StudyRequest
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Getter
@Setter
@ToString
public class StudyRequest {
    private User user;
    private String name;
    private boolean isPublic;
    private String language;
    private Integer maxPeople;
    private String code;

    public Study toEntity() {
        Study study = Study.builder()
                .user(user)
                .name(name)
                .isPublic(isPublic)
                .language(language)
                .maxPeople(maxPeople)
                .code(code)
                .build();
        return study;
    }
}