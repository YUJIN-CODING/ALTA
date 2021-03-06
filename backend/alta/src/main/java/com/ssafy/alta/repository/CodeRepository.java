package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: CodeRepository
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 레포지토리
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
public interface CodeRepository extends JpaRepository<Code, Long> {
    List<Code> findByUser_IdOrderByCreateDateAsc(String userId);

    List<Code> findByProblem_IdOrderByCreateDateAsc(long problemId);

    Code findCodeByProblem_IdAndFileName(long problemId, String fileName);

    List<Code> findByProblem_IdOrderByUserId(long problemId);

    Code findCodeByFileNameAndUser_IdAndProblem_Id(String filename, String userId, long problemId);

    Optional<Code> findTopByProblem_IdAndUser_IdOrderByIdDesc(long problemId, String userId);
}
