DELIMITER $$

-- 新建愿望
DROP PROCEDURE IF EXISTS addNewWish $$
CREATE PROCEDURE addNewWish(
	in vTags varchar(120),
	in numTag int,
	in vTitle varchar(200),
	in vContent text,
	in userId int
)
BEGIN
	declare curTagIndex int default 1;
	declare redueTagNames varchar(120) default vTags;
	declare curTagName varchar(120);
	declare redueTagIndex int;
	declare tId int;
	declare wId int;
	declare homeHref varchar(200);
	insert into wishes (title,content,create_time,user_id)values(vTitle,vContent,now(),userId);
	select LAST_INSERT_ID() into wId;
	set homeHref = concat('/wish/', cast(wId as char(200)));
	update wishes set home_href = homeHref where id = wId;
	while curTagIndex<=numTag do
		set curTagName = substring_index(redueTagNames,',',1);
		set redueTagIndex = curTagIndex-numTag;
		set redueTagNames = substring_index(vTags,',',redueTagIndex);
		set curTagIndex = curTagIndex+1;
		set tId = 0;
		select id into tId from tags where name = curTagName;
		if tId >= 1 then
			insert into r_wishes_tags (w_id,t_id)values(wId,tId);
		else 
			insert into tags (name)values(curTagName);
			select LAST_INSERT_ID() into tId;
			insert into r_wishes_tags (w_id,t_id)values(wId,tId);
		end if;
	end while;
END $$

-- 更新愿望
DROP PROCEDURE IF EXISTS updateWish $$
CREATE PROCEDURE updateWish(
	in vTags varchar(120),
	in numTag int,
	in vTitle varchar(200),
	in vContent text,
	in userId int,
	in wId int
)
BEGIN
	declare curTagIndex int default 1;
	declare redueTagNames varchar(120) default vTags;
	declare curTagName varchar(120);
	declare redueTagIndex int;
	declare tId int;
	declare homeHref varchar(200);
	update wishes set title = vTitle ,content = vContent, user_id = userId where id = wId;
	while curTagIndex<=numTag do
		set curTagName = substring_index(redueTagNames,',',1);
		set redueTagIndex = curTagIndex-numTag;
		set redueTagNames = substring_index(vTags,',',redueTagIndex);
		set curTagIndex = curTagIndex+1;
		set tId = 0;
		select id into tId from tags where name = curTagName;
		-- 假如是新存在的标签，加入标签表
		if tId >= 1 then
			insert into r_wishes_tags (w_id,t_id)values(wId,tId);
		else
			insert into tags (name)values(curTagName);
			select LAST_INSERT_ID() into tId;
		end if;
		-- 更新愿望标签表
		select count(t_id) into tId from r_wishes_tags where w_id = wId and t_id = tId;
		if tId < 1 then
		  insert into r_wishes_tags (w_id,t_id)values(wId,tId);
    end if;
	end while;
END $$

DELIMITER ;
