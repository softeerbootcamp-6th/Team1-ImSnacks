package com.imsnacks.Nyeoreumnagi.work;

import com.imsnacks.Nyeoreumnagi.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
