CREATE TABLE `Farm` (
                        `farm_id`	int4	NOT NULL,
                        `member_id`	int4	NOT NULL,
                        `state`	varchar(255)	NOT NULL,
                        `city`	varchar(255)	NOT NULL,
                        `town`	varchar(255)	NOT NULL,
                        `address`	varchar(255)	NULL,
                        `latitude`	double	NOT NULL,
                        `longitude`	double	NOT NULL,
                        `nx`	int4	NOT NULL,
                        `ny`	int4	NOT NULL
);

CREATE TABLE Unique_Nx_Ny (
                            nx INT NOT NULL,
                            ny INT NOT NULL,
                            UNIQUE (nx, ny)
);