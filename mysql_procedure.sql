DELIMITER $$
##Add new wish.
DROP PROCEDURE IF EXISTS addNewWish $$
CREATE PROCEDURE addNewWish(
	in vTags varchar(120),
	in numTag int,
	in vTitle varchar(200),
	in vContent text
)
BEGIN
	declare curTagIndex int default 1;
	declare redueTagNames varchar(120) default vTags;
	declare curTagName varchar(120);
	declare redueTagIndex int;
	declare tId int;
	declare wId int;
	insert into wishes (title,content,create_time)values(vTitle,vContent,now());
	select LAST_INSERT_ID() into wId;
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

DELIMITER ;