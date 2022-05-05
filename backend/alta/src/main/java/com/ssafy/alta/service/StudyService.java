package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.GithubRepoRequest;
import com.ssafy.alta.dto.request.StudyJoinInfoRequest;
import com.ssafy.alta.dto.response.StudyJoinInfoResponse;
import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.exception.DuplicateRepoException;
import com.ssafy.alta.exception.UnAuthorizedException;
import com.ssafy.alta.gitutil.GitRepoAPI;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: StudyService
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final StudyJoinInfoRepository sjiRepository;
    private final UserService userService;
    private final RedisService redisService;
    private final GitRepoAPI gitRepoAPI = new GitRepoAPI();

    @Transactional(rollbackFor = Exception.class)
    public void insertStudy(StudyRequest studyRequest) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));

        User user = optUser.get();
        studyRequest.setUser(user);
        studyRequest.setCode(UUID.randomUUID().toString().substring(0, 8));

        String repoName = studyRequest.getRepositoryName().toString();
        repoName = repoName.replaceAll("\\p{Z}", "-");
        studyRequest.setRepositoryName(repoName);

        if (!gitRepoAPI.selectRepo(token, user.getName(), repoName)) {
            throw new DuplicateRepoException();
        }

        Study study = studyRepository.save(studyRequest.toEntity());
        sjiRepository.save(new StudyJoinInfoRequest(user, study, "가입", "그룹장", true, new Date()).toEntity());

        GithubRepoRequest githubRepoRequest = GithubRepoRequest.builder()
                .name(study.getRepositoryName())
                .description(study.getIntroduction())
                .auto_init(true)
                .build();

        gitRepoAPI.insertRepo(token, githubRepoRequest);
    }

    @Transactional(rollbackFor = Exception.class)
    public HashMap<String, Object> selectStudyMemberList(Long studyId){
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입")) {
            throw new UnAuthorizedException();
        }

        HashMap<String, Object> map = new HashMap<>();
        List<StudyJoinInfo> sjiList = null;
        List<StudyJoinInfoResponse> sjiResponse = new ArrayList<>();
        String study_code = null;
        int study_max_people = optSJI.get().getStudy().getMaxPeople();

        if(optSJI.get().getPosition().equals("그룹장")) {
            sjiList = sjiRepository.findByStudyStudyId(studyId);
            study_code = sjiList.get(0).getStudy().getCode();
        } else {
            sjiList = sjiRepository.findByStudyStudyIdAndStateContains(studyId, "가입");
        }

        for(StudyJoinInfo sji : sjiList) {
            sjiResponse.add(sji.toStudyJoinInfoResponse());
        }

        map.put("members", sjiResponse);
        map.put("study_code", study_code);
        map.put("study_max_people", study_max_people);

        return map;
    }

}