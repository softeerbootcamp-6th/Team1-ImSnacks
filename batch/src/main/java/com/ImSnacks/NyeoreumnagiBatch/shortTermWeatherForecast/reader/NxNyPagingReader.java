package com.ImSnacks.NyeoreumnagiBatch.shortTermWeatherForecast.reader;

import com.ImSnacks.NyeoreumnagiBatch.common.entity.UniqueNxNy;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.Order;
import org.springframework.batch.item.database.PagingQueryProvider;
import org.springframework.batch.item.database.builder.JdbcPagingItemReaderBuilder;
import org.springframework.batch.item.database.support.SqlPagingQueryProviderFactoryBean;
import org.springframework.batch.item.database.support.SqlitePagingQueryProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class NxNyPagingReader {
    private final DataSource dataSource;

    @Bean
    public ItemReader<UniqueNxNy> pagingReader() throws Exception {
        return new JdbcPagingItemReaderBuilder<UniqueNxNy>()
                .name("nxNyPagingReader")
                .dataSource(dataSource)
                .pageSize(20)
                .fetchSize(20)
                .rowMapper(new BeanPropertyRowMapper<>((UniqueNxNy.class)))
                .queryProvider(createPagingQueryProvider())
                .build();
    }

    public PagingQueryProvider createPagingQueryProvider() throws Exception {
        SqlPagingQueryProviderFactoryBean factory = new SqlPagingQueryProviderFactoryBean();
        factory.setDataSource(dataSource);
        factory.setSelectClause("SELECT nx, ny");
        factory.setFromClause("FROM unique_nx_ny");
        Map<String, Order> sortKeys = Map.of("nx", Order.ASCENDING, "ny", Order.ASCENDING);
        factory.setSortKeys(sortKeys);
        return factory.getObject();
    }
}
