package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.CommentRequest;
import com.ssafy.alta.dto.request.CommentUpdateRequest;
import com.ssafy.alta.dto.request.CommentUpdateSolvedRequest;
import com.ssafy.alta.service.CommentService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: CommentController
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	: 코드 댓글 관련 기능 제공
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */
@Api("코드 댓글 관련 기능")
@RestController
@RequestMapping("/api/code/review")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity insertComment(@RequestBody CommentRequest commentRequest) {
        String userId = "11";
        commentService.insertComment(userId, commentRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{review_id}")
    public ResponseEntity deleteComment(@PathVariable("review_id") Long reviewId) {
        String userId = "11";
        commentService.deleteComment(userId, reviewId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{review_id}")
    public ResponseEntity updateComment(@PathVariable("review_id")Long reviewId, @RequestBody CommentUpdateRequest commentUpdateRequest, @RequestHeader(required = false) String Authorization) {
        String userId = "11";
        commentService.updateComment(userId, reviewId, commentUpdateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/{review_id}/solved")
    public ResponseEntity updateCommentSolved(@PathVariable("review_id") Long reviewId, @RequestBody CommentUpdateSolvedRequest request, @RequestHeader(required = false) String Authorization ) {
        String userId = "11";
        commentService.updateCommentSolved(userId, reviewId, request.isSolved());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
