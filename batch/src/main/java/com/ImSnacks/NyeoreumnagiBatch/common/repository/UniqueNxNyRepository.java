package com.ImSnacks.NyeoreumnagiBatch.common.repository;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.NxNyId;
import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniqueNxNyRepository extends JpaRepository<UniqueNxNy, NxNyId> {
}
