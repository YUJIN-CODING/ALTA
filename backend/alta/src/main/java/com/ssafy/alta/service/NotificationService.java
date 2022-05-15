package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.entity.Alert;
import com.ssafy.alta.exception.SseSendMessageFail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: NotificationService
 * author 	    : 우정연
 * date		    : 2022-05-14
 * description	: Server-Sent Events 관련한 service
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-14	    우정연  		    최초 생성
 */
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserService userService;
    private static Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();  // multi-thread에서 동시에 작업하기 위한 map 클래스

    private static final Long DEFAULT_TIMEOUT = 60L * 60 * 1000;  // 타임아웃 시간 - 1시간(ms)

    public SseEmitter subscribe() {
        String userId = userService.getCurrentUserId();

        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);  // sse 연결 요청에 응답하기 위해 sseEmitter 객체 생성(유호시간)

//        String dummyData = "EventStream Created! userId : " + userId;
//        this.sendToClient(emitter, userId, dummyData);
        emitters.put(userId, emitter);  // 생성된 emitters를 저장해둠

        emitter.onCompletion(() -> emitters.remove(userId));  // 네트워크 에러
        emitter.onTimeout(() -> emitters.remove(userId));  // 타임아웃

        return emitter;
    }
    
    public void sendAlertEvent(Alert alert) {  // 이벤트 발생
        AlertResponse alertResponse = alert.toDto();
        String userId = alert.getReceiver().getId();  // 받을 사람에게 알림 발생할거라

        if (emitters.containsKey(userId)) {   // sse가 연결된 유저이면
            SseEmitter emitter = emitters.get(userId); 
            this.sendToClient(emitter, userId, alertResponse);  // 알림 객체 보내줌
        }

    }

    // 알림 전송
    private void sendToClient(SseEmitter emitter, String userId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(userId)
                    .data(data), MediaType.APPLICATION_JSON);
        } catch (IOException e) {
            emitters.remove(userId);
            throw new SseSendMessageFail();
        }
    }
}
