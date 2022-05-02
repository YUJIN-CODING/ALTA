package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: CommentWriterNotMatchException
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	: 댓글 작성자가 아닌 유저가 삭제를 시도할 경우, 발생
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */
public class CommentWriterNotMatchException extends BusinessException{
    public CommentWriterNotMatchException() {
        super(ErrorCode.COMMENT_WRITER_NOT_MATCH);
    };
}
