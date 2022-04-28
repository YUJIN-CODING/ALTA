package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: CodeRequest
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 추가 요청 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
@ApiModel(value = "코드 추가 요청 정보")
@Getter
@Setter
@AllArgsConstructor
public class CodeRequest {
    @ApiModelProperty(value = "커밋 메시지")
    private String message;

    @ApiModelProperty(value = "경로 - /경로/파일이름.확장자", required = true)
    private String path;

    @ApiModelProperty(value = "문제 키", required = true)
    private Long problemId;

    @ApiModelProperty(value = "코드", required = true)
    private String content;

    public Code toCode(User user, Problem problem) {
        Code code = Code.builder()
                .content(content)
                .path(path)
                .user(user)
                .problem(problem)
                .build();
        return code;
    }
}
