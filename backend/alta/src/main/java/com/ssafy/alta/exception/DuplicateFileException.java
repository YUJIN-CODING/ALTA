package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DuplicateFileException
 * author 	    : 우정연
 * date		    : 2022-05-04
 * description	: 중복 파일이 있는 경우 발생 예외
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-04	    우정연  		    최초 생성
 */
public class DuplicateFileException extends BusinessException{
    public DuplicateFileException() { super(ErrorCode.DUPLICATE_FILE_ERROR);}
}
