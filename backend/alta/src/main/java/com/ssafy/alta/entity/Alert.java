package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.dto.response.CommentResponse;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Alert
 * author 	    : 김유진
 * date		    : 2022-05-03
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-03	        김유진  		        최초 생성
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@DynamicInsert
@DynamicUpdate
@Table(name = "alert")
@ToString
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alert_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_receiver_id")
    private User receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_sender_id")
    private User sender;

    @NonNull
    @Convert(converter = AlertConverter.class)
    @Column(name = "alert_type")
    private AlertType type;

    @NonNull
    @Column(name = "alert_content")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "alert_transmission_time")
    private Date transTime;

    @Column(name = "alert_redirect_url")
    private String redirect_url;

    @Column(name = "alert_is_checked")
    private Boolean isChecked;

    public AlertResponse toDto() {
        return AlertResponse.builder()
                .alertId(this.id)
                .senderNickName(this.sender.getName())
                .type(this.type.name())
                .content(this.content)
                .time(this.transTime)
                .url(this.redirect_url)
                .isChecked(this.isChecked != null && this.isChecked)
                .build();
    }

    public void changeChecked() {
        this.isChecked = true;
    }
}