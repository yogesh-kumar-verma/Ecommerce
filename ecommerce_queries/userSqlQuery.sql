-- TABLE OPERATIONS 
-- create TABLE   users (
--      _id INT identity(1,1)  primary key, 
--       name varchar(50),
--     email varchar(50) ,
--     username varchar(50) ,
--     password varchar(50) ,
--     mailToken varchar(50) ,
--     isVerified int ,
--     role  int,
--     crated_at date DEFAULT GETDATE()
--   );

-- create TABLE [dbo].[users] (
--     [_id]              INT          IDENTITY (1, 1) NOT NULL,
--     [name]             VARCHAR (50) NOT NULL,
--     [email]            VARCHAR (50) NOT NULL,
--     [username]         VARCHAR (50) NULL,
--     [password]         VARCHAR (50) NULL,
--     [mailToken]        VARCHAR (50) NULL,
--     [isVerified]       INT          CONSTRAINT [DEFAULT_users_isVerified] DEFAULT ((0)) NULL,
--     [role]             INT          CONSTRAINT [DEFAULT_users_role] DEFAULT ((0)) NULL,
--     [created_at] DATE         DEFAULT (getdate()) NULL,
--     [mobile]           INT          NULL,
--     PRIMARY KEY CLUSTERED ([_id] ASC),
--     CONSTRAINT [uniq_hai] UNIQUE NONCLUSTERED ([username] ASC, [email] ASC)
-- );


  
-- delete from products
-- where seller= 2
-- delete from carts
-- where user_id=1;
--  delete from users
--  where name = 'yogesh'
-- EXEC sp_rename 'users.crated_at', 'created_at', 'COLUMN';
-- alter table users drop column user.created_at;



-- update users set role =1 where username='1'; 
update users set [password] ='1' where username='1'; 
-- delete  from users where username='1';  
SELECT * FROM users;
SELECT * from products;
select * from orders
select * from carts

--  for createuser 
-- insert into users (name ,email,username,password,mailToken) VALUES ('yogesh','vyogesh624@gmail.com','1','1','123123123');
--  for createSeller
--  insert into users (name ,email,username,password,mailToken,role,isVerified) VALUES ('yogesh','vyogesh625@gmail.com','12','12','123123123',1,1);
--  for allSeller
  -- select * from users where isSeller =1;
--  for deleteUser
    
  --  DELETE FROM [dbo].[users]
  --  WHERE  user_id = 1;
  -- for updateUserWithToken
  -- Update rows in table '[TableName]' in schema '[dbo]'
  -- UPDATE [dbo].[users]
  -- SET
  --   isVerified = 1
  --   -- Add more columns and values here
  -- WHERE mailToken =123123123  
   
     