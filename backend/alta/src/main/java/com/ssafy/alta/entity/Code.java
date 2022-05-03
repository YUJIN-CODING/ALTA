package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.CodeAndCommentResponse;
import com.ssafy.alta.dto.response.CodeResponse;
import com.ssafy.alta.dto.response.CommentResponse;
import com.ssafy.alta.util.FileToLanguage;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Code
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 엔티티
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@Entity
@Table(name = "code")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Code {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "code_create_date")
    private Date createDate;

    @NotNull
    @Column(name = "code_file_name")
    private String fileName;

    @NotNull
    @Column(name = "code_content")
    private String content;

    @NotNull
    @Column(name = "code_sha")
    private String sha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_problem_id")
    private Problem problem;

    @Builder
    public Code(String fileName, String sha, String content, User user, Problem problem) {
        this.fileName = fileName;
        this.sha = sha;
        this.content = content;
        this.user = user;
        this.problem = problem;
    }

    public CodeResponse toCodeResponse() {
        return CodeResponse.builder()
                .id(id)
                .nickname(user.getNickname())
                .path(fileName)
                .build();
    }

    public void changeSha(String sha) {
        this.sha = sha;
    }
    public void changeShaAndContent(String sha, String content) {
        this.sha = sha;
        this.content = content;
    }

    public CodeAndCommentResponse toCodeAndCommentResponse(List<CommentResponse> commentResponseList) {
        return CodeAndCommentResponse.builder()
                .code(this.content)
                .language(FileToLanguage.getInstanse().getLanguage(this.fileName))
                .reviews(commentResponseList)
                .build();
    }
}
