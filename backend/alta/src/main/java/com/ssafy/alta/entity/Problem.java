package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.ProblemResponse;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Problem
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 문제 엔티티
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
@Entity
@Table(name = "problem")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "problem_id")
    private Long id;

    @NotNull
    @Column(name = "problem_name")
    private String name;

    @NotNull
    @Column(name = "problem_link")
    private String link;

    @Column(name = "problem_is_cancel")
    private Boolean isCancel;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_schedule_id")
    private Schedule schedule;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL)
    private List<Code> code = new ArrayList<>();

    @Builder
    public Problem(String name, String link, boolean isCancel, Schedule schedule) {
        this.name = name;
        this.link = link;
        this.isCancel = isCancel;
        this.schedule = schedule;
    }

    public ProblemResponse toProblemResponse() {
        return ProblemResponse.builder()
                .id(id)
                .name(name)
                .link(link)
                .build();
    }
}
