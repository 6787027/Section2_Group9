create database celestecraft;
use celestecraft;

create table User_Account (
	Acc_Email varchar(255) not null primary key,
    Acc_FName varchar(255) not null,
    Acc_LName varchar(255) not null,
    Acc_PhoneNum varchar(10) not null,
    Acc_Password varchar(255) not null,
    Acc_Type varchar(255) not null
    -- Type: Admin, User
);

insert into user_account (Acc_Email, Acc_FName, Acc_LName,Acc_Password,Acc_PhoneNum,Acc_Type) values
("matsukos128@gmail.com", "Nongnoey", "EiEi", "maibok","0814668796","User"),
("pimthida1117@gmail.com","Admin Noey", "Naja", "Admin123", "0848798796", "Admin");


create table Collection(
	Col_ID varchar(255) not null primary key,
    Col_Name varchar(255) not null
);

-- insert doll genre
insert into Collection (Col_ID,Col_Name) values
("GD001","Fortune"),
("GD002","Health"),
("GD003","Love"),
("GD004","Success");

-- insert accessory collection
insert into Collection (Col_ID,Col_Name) values
("CA001","HarryPotter"),
("CA002","Halloween"),
("CA003","Christmas"),
("CA004","Sanrio");


create table Product (
	Pro_ID varchar(24) not null primary key,
    Pro_Name varchar(255) not null,
    Pro_Description LONGTEXT,
    Pro_Price double(13,2) not null,
    Pro_Type varchar(255) not null,
    Pro_Quantity double not null,
    Pro_ColID varchar(255) not null
);

-- add doll
insert Product (Pro_ID,Pro_Name,Pro_Description,Pro_Price,Pro_Type,Pro_Quantity,Pro_ColID) values
("DS00001","Fortuna Doll","This is the Fortuna Doll, representing the Roman goddess of fortune. She wears a white and gold Roman tunic, has angelic wings, and holds a golden laurel wreath, symbolizing luck and victory."
,590,"Doll",500,"GD001"),
("DS00002","Benzaite Doll","Benzaite Doll, a plush doll representing Benzaiten, the Japanese goddess of fortune, art, and music.  The doll is characterized by its sweet pink, traditional-style robe with elegant gold embroidery. It holds a `biwa` (Japanese lute), her signature instrument, and wears beautiful, ornate hair accessories."
,590,"Doll",500,"GD001"),
("DS00003","Chang'e Doll","Chang'e Doll, a plush doll representing Chang'e, the Chinese goddess of the Moon. She is featured in an elegant, light blue traditional robe decorated with gold embroidery, cloud patterns, and rabbit motifs. Her design highlights her key symbols: a delicate crescent moon headdress and the Jade Rabbit her faithful companion on the moon. In mythology, Chang'e is famously associated with the elixir of immortality, which connects her to the genre of health and long life."
,590,"Doll",500,"GD002"),
("DS00004","Asclepius Doll","Asclepius Doll Keychain Introducing the adorable `Asclepius` doll keychain, inspired by the Greek God of Medicine and Healing! It's convenient and easy to carry, like having pocket-sized magic that grants good health and comfort everywhere you go."
,590,"Doll",500,"GD002"),
("DS00005","Cupid Doll","This is the Cupid Doll, representing the Roman god of love. He is a cherub with small wings, holding his signature golden bow and heart-tipped arrow, symbolizing romance and desire."
,590,"Doll",500,"GD003"),
("DS00006","Lakshmi Doll","This is the Lakshmi Doll, representing the Hindu goddess Lakshmi. She is the goddess of wealth, prosperity, beauty, and love. The doll is dressed in an elegant red and gold sari with rich jewelry, and she holds her sacred pink lotus flower."
,590,"Doll",500,"GD003"),
("DS00007","Isis Doll","This is the Isis Doll, representing the powerful Egyptian goddess Isis. She is a symbol of motherhood, magic, and profound wifely love. The doll features her iconic throne headdress, protective wings, and holds an Ankh, the symbol of life."
,590,"Doll",500,"GD003"),
("DS00008","Venus Doll","This is the Venus Doll, representing the Roman goddess of love and beauty. She is shown with her symbols: a white dove on her shoulder, a hand mirror, and the seashell from which she was born."
,590,"Doll",500,"GD003"),
("DS00009","Ganesha Doll","This is the Ganesha Doll, representing the Hindu god Ganesha. He is revered as the god of success, wisdom, and the remover of obstacles. The doll features his signature elephant head, a small crown, and holds his symbolic items, including a bowl of sweets (Modak)."
,590,"Doll",500,"GD004"),
("DS00010","Inari Okami Doll","This is the Inari Okami Doll, representing the Japanese kami (deity) Inari. As the kami of foxes, agriculture, industry, and general prosperity, Inari is strongly associated with success. The doll features white fox ears and a tail, a traditional red and white shrine outfit, and a golden crescent moon crown."
,590,"Doll",500,"GD004");

-- add Accessory
insert Product (Pro_ID,Pro_Name,Pro_Description,Pro_Price,Pro_Type,Pro_Quantity,Pro_ColID) values
("AC00001","Slytherin","Slytherin Robe, a doll accessory from the Harry Potter genre. It's a miniature black wizarding robe featuring the signature emerald green lining and the Slytherin house crest, representing ambition and cunning."
,290,"Accessory",100,"CA001"),
("AC00002","Gryffindor","Gryffindor Robe, a doll accessory from the Harry Potter genre. It's a miniature black wizarding robe featuring the signature scarlet red lining and the Gryffindor house crest, representing bravery and chivalry."
,290,"Accessory",100,"CA001"),
("AC00003","Ravenclaw","Ravenclaw Robe, a doll accessory from the Harry Potter genre. It's a miniature black wizarding robe featuring the signature blue lining and the Ravenclaw house crest, representing intelligence and wit."
,290,"Accessory",100,"CA001"),
("AC00004","Hufflepuff","Hufflepuff Robe, a doll accessory from the Harry Potter genre. It's a miniature black wizarding robe featuring the signature canary yellow lining and the Hufflepuff house crest, representing loyalty, patience, and hard work."
,290,"Accessory",100,"CA001"),
("AC00005","Bat","Bat outfit, a doll accessory set for the Halloween genre. It includes a purple vest, an orange-and-black striped shirt and pants, and a pair of large, dark bat wings. The set is displayed with black boots and a light-up, bat-eared Jack-o'-lantern."
,190,"Accessory",200,"CA002"),
("AC00006","Vampire","Vampire outfit, a doll accessory set for the Halloween genre. It features a gothic black lace dress, a white shirt with a bow, and a classic high-collar vampire cape (black on the outside, red on the inside). The set is shown with black boots and a light-up, witch-hat-wearing Jack-o'-lantern."
,190,"Accessory",200,"CA002"),
("AC00007","Witch","Witch outfit, a doll accessory set for the Halloween genre. It includes a classic pointed witch hat with an orange band, a purple vest, a black and purple layered lace skirt, and a pair of purple bat wings."
,190,"Accessory",200,"CA002"),
("AC00008","Santa","Santa outfit, a doll accessory set for the Christmas genre. It's a classic Santa Claus suit, including a red velvet jacket and pants with white fur trim, a black belt, a matching Santa hat, and a white beard."
,190,"Accessory",200,"CA003"),
("AC00009","Santy","Santy outfit, a doll accessory for the Christmas genre. It's a festive red velvet dress with white fur trim, a large green bow, holly embroidery, and a matching Santa hat."
,190,"Accessory",200,"CA003"),
("AC00010","Reindeer","Reindeer outfit, a doll accessory for the Christmas genre. It's a brown dress with white fur trim and a red bow, complete with a hooded cape resembling a reindeer head with antlers and a red nose."
,190,"Accessory",200,"CA003"),
("AC00011","Kitty","Kitty outfit, a doll accessory from the Sanrio genre. It's a white dress featuring a prominent red bow, lace trim, and a skirt patterned with the iconic Hello Kitty face."
,290,"Accessory",100,"CA004"),
("AC00012","Cinnamoroll","Cinnamoroll outfit, a doll accessory from the Sanrio genre. It's a blue and white Lolita-style dress featuring a large bow at the neck, extensive white lace, and a pattern of the character Cinnamoroll on clouds."
,290,"Accessory",100,"CA004"),
("AC00013","Kuromi","Kuromi outfit, a doll accessory from the Sanrio genre. It's a black hoodie-style dress with a white fur-lined hood, a purple bow, and an all-over pattern of the character Kuromi and pink hearts."
,290,"Accessory",100,"CA004"),
("AC00014","Melody","Melody outfit, a doll accessory from the Sanrio genre. It's a pink and white Lolita-style dress featuring a pink bow, white lace trim, and a skirt patterned with the character My Melody and hearts."
,290,"Accessory",100,"CA004"),
("AC00015","Pochacco","Pochacco outfit, a doll accessory from the Sanrio genre. It's a casual set featuring a white, short-sleeved hoodie patterned with the character Pochacco, a large black bow, and black shorts with white lace trim."
,290,"Accessory",100,"CA004");



create table ProductPicture (
	Pic_id varchar(255) not null primary key,
	Pic_ProID varchar(255) not null,
    Pro_Picture varchar(255) not null
);

-- add doll picture (f,b,s in each product)
insert into ProductPicture(Pic_id,Pic_ProID,Pro_Picture) values
("DS00001f","DS00001","https://www.pinterest.com/pin/870039221771948950/"),
("DS00001b","DS00001","https://www.pinterest.com/pin/870039221771948971/"),
("DS00001s","DS00001","https://www.pinterest.com/pin/870039221771949003/"),

("DS00002f","DS00002","https://www.pinterest.com/pin/870039221771948160/"),
("DS00002b","DS00002","https://www.pinterest.com/pin/870039221771948165/"),
("DS00002s","DS00002","https://www.pinterest.com/pin/870039221771948171/"),

("DS00003f","DS00003","https://www.pinterest.com/pin/870039221771947845/"),
("DS00003b","DS00003","https://www.pinterest.com/pin/870039221771947853/"),
("DS00003s","DS00003","https://www.pinterest.com/pin/870039221771947858/"),

("DS00004f","DS00004","https://www.pinterest.com/pin/870039221771947736/"),
("DS00004b","DS00004","https://www.pinterest.com/pin/870039221771947750/"),
("DS00004s","DS00004","https://www.pinterest.com/pin/870039221771947770/"),

("DS00005f","DS00005","https://www.pinterest.com/pin/870039221771947872/"),
("DS00005b","DS00005","https://www.pinterest.com/pin/870039221771947884/"),
("DS00005s","DS00005","https://www.pinterest.com/pin/870039221771947892/"),

("DS00006f","DS00006","https://www.pinterest.com/pin/870039221771949357/"),
("DS00006b","DS00006","https://www.pinterest.com/pin/870039221771949812/"),
("DS00006s","DS00006","https://www.pinterest.com/pin/870039221771949832/"),

("DS00007f","DS00007","https://www.pinterest.com/pin/870039221771949220/"),
("DS00007b","DS00007","https://www.pinterest.com/pin/870039221771949246/"),
("DS00007s","DS00007","https://www.pinterest.com/pin/870039221771949303/"),

("DS00008f","DS00008","https://www.pinterest.com/pin/870039221771949849/"),
("DS00008b","DS00008","https://www.pinterest.com/pin/870039221771949862/"),
("DS00008s","DS00008","https://www.pinterest.com/pin/870039221771949875/"),

("DS00009f","DS00009","https://www.pinterest.com/pin/870039221771949074/"),
("DS00009b","DS00009","https://www.pinterest.com/pin/870039221771949091/"),
("DS00009s","DS00009","https://www.pinterest.com/pin/870039221771949115/"),

("DS00010f","DS00010","https://www.pinterest.com/pin/870039221771949143/"),
("DS00010b","DS00010","https://www.pinterest.com/pin/870039221771949173/"),
("DS00010s","DS00010","https://www.pinterest.com/pin/870039221771949196/");



-- add accessory picture (f,b,s in each product)
insert into ProductPicture(Pic_id,Pic_ProID,Pro_Picture) values
("AC00001f","AC00001","https://i.pinimg.com/736x/11/d2/32/11d232b0d75bab55eb7fbd6afa53f798.jpg"),
("AC00001b","AC00001","https://i.pinimg.com/736x/d6/43/ac/d643ac8e2d88641662299865291ac18f.jpg"),
("AC00001s","AC00001","https://i.pinimg.com/736x/13/0a/60/130a605a7def100700ff230412631c0e.jpg"),

("AC00002f","AC00002","https://i.pinimg.com/736x/fe/80/16/fe80169eec2fc1b85fa9cc5a25720077.jpg"),
("AC00002b","AC00002","https://i.pinimg.com/736x/b4/9b/05/b49b050d237425dc18ed1ebf89ef6e64.jpg"),
("AC00002s","AC00002","https://i.pinimg.com/736x/6e/6e/f7/6e6ef7e6afceeee066a058873dbf4ba4.jpg"),

("AC00003f","AC00003","https://i.pinimg.com/736x/ff/94/4f/ff944f453d2cbb737749bb85ab4bdfef.jpg"),
("AC00003b","AC00003","https://i.pinimg.com/736x/5a/cf/22/5acf223e245deaa17777a3c8161cc9e8.jpg"),
("AC00003s","AC00003","https://i.pinimg.com/736x/d1/26/19/d126195e77380783f1ab3a4b60ef5520.jpg"),

("AC00004f","AC00004","https://i.pinimg.com/736x/0a/dc/9f/0adc9f344bc371172f96f9bd0ba6d7ce.jpg"),
("AC00004b","AC00004","https://i.pinimg.com/736x/eb/9d/ed/eb9ded29821c6cb9492418bf75316b3e.jpg"),
("AC00004s","AC00004","https://i.pinimg.com/736x/50/e4/12/50e412fef4715f6c55d9a01ad27adbf7.jpg"),

("AC00005f","AC00005","https://i.pinimg.com/736x/50/57/c2/5057c2c9ce05743806b6b6406f44baef.jpg"),
("AC00005b","AC00005","https://i.pinimg.com/736x/a0/e4/91/a0e4916066d5e59b479591c83da675ac.jpg"),
("AC00005s","AC00005","https://i.pinimg.com/736x/56/08/be/5608becab8b2316c072fea39147bea25.jpg"),

("AC00006f","AC00006","https://i.pinimg.com/736x/b6/7b/1d/b67b1d4d1108307a68334111da863cd0.jpg"),
("AC00006b","AC00006","https://i.pinimg.com/736x/96/2e/61/962e6180b6b6991fc98acba5804b99f6.jpg"),
("AC00006s","AC00006","https://i.pinimg.com/736x/21/b9/fa/21b9fa3fd2cd3e3dc0f9d0466d20d555.jpg"),

("AC00007f","AC00007","https://i.pinimg.com/736x/16/0a/3b/160a3bd7bfd2f93db62acfcfa63e6257.jpg"),
("AC00007b","AC00007","https://i.pinimg.com/736x/7a/9b/67/7a9b679a053dd89d14472b9c69cd6782.jpg"),
("AC00007s","AC00007","https://i.pinimg.com/736x/f1/4d/8a/f14d8a86a5a2b0e84d0daff3e18de69e.jpg"),

("AC00008f","AC00008","https://i.pinimg.com/736x/b1/16/c0/b116c0ac45ab4cdce12f38d4ff3011be.jpg"),
("AC00008b","AC00008","https://i.pinimg.com/736x/28/40/1e/28401e178161b160a3f959b060dce920.jpg"),
("AC00008s","AC00008","https://i.pinimg.com/736x/55/05/9b/55059b80acb7f54783ac3db50a03e607.jpg"),

("AC00009f","AC00009","https://i.pinimg.com/736x/00/66/bf/0066bfe8198b38caba9090ed97e97654.jpg"),
("AC00009b","AC00009","https://i.pinimg.com/736x/b9/cc/88/b9cc880796f067b4518dfe78c0617b5a.jpg"),
("AC00009s","AC00009","https://i.pinimg.com/736x/71/af/e3/71afe3d9234536912e4e437de8ae93e3.jpg"),

("AC00010f","AC00010","https://i.pinimg.com/736x/12/7f/c1/127fc15b5f21f739cf3da875e107e278.jpg"),
("AC00010b","AC00010","https://i.pinimg.com/736x/3b/44/1b/3b441b65c38601d4f4deec94c2a6a477.jpg"),
("AC00010s","AC00010","https://i.pinimg.com/736x/e5/ef/dd/e5efdd973862abb2301551dc2e780fd1.jpg"),

("AC00011f","AC00011","https://i.pinimg.com/736x/00/09/50/000950460cc72db579ec4733581e4434.jpg"),
("AC00011b","AC00011","https://i.pinimg.com/736x/a0/e4/91/a0e4916066d5e59b479591c83da675ac.jpg"),
("AC00011s","AC00011","https://i.pinimg.com/736x/68/b4/74/68b4747464697be450048da60e0b956a.jpg"),

("AC00012f","AC00012","https://i.pinimg.com/736x/c0/98/53/c0985347c66edf894d99230854c1ed2d.jpg"),
("AC00012b","AC00012","https://i.pinimg.com/736x/02/f0/05/02f005fa6884976882cc31bb5f1dc2af.jpg"),
("AC00012s","AC00012","https://i.pinimg.com/736x/3c/eb/22/3ceb2208072582345d7c31c1568f306b.jpg"),

("AC00013f","AC00013","https://i.pinimg.com/736x/59/08/de/5908deb5ad6c3c817d3ceb8ab9634f36.jpg"),
("AC00013b","AC00013","https://i.pinimg.com/736x/6a/45/bc/6a45bcb2741a7ad6e56d9335ae6f9ca6.jpg"),
("AC00013s","AC00013","https://i.pinimg.com/736x/23/55/f3/2355f31539e4a66bf1f81a67154e8b37.jpg"),

("AC00014f","AC00014","https://i.pinimg.com/474x/07/e1/7a/07e17ad552384501b684c533b8f7c546.jpg"),
("AC00014b","AC00014","https://i.pinimg.com/736x/da/86/2e/da862e21e3db7f13fec76effde5e4944.jpg"),
("AC00014s","AC00014","https://i.pinimg.com/736x/27/d6/30/27d630d988c1150cb22809b335a6a7d9.jpg"),

("AC00015f","AC00015","https://i.pinimg.com/736x/da/86/2e/da862e21e3db7f13fec76effde5e4944.jpg"),
("AC00015b","AC00015","https://i.pinimg.com/736x/7b/5c/a3/7b5ca3bd0368989386d866e9c1c2ed55.jpg"),
("AC00015s","AC00015","https://i.pinimg.com/736x/98/2e/d7/982ed752c2204be063f8ef07abc03951.jpg");


create table Cart (
	Cart_AccEmail varchar(255) not null,
    Cart_ProID varchar(255) not null,
    Cart_Quantity double not null,
    Cart_ID varchar(255) not null primary key
);

create table User_Order(
	Or_Num varchar(255) not null primary key,
    Or_Time DATETIME not null,
    Or_CartID varchar(255) not null
);

alter table Product
add foreign key (Pro_ColID)
references Collection(Col_ID)
on update cascade;

alter table ProductPicture
add foreign key (Pic_ProID)
references Product (Pro_ID)
ON Update Cascade;


alter table Cart
add foreign key (Cart_ProID)
references Product (Pro_ID)
ON Update Cascade;

alter table Cart
add foreign key (Cart_AccEmail)
references User_Account (Acc_Email)
ON Update Cascade;

alter table User_Order
add foreign key (Or_CartID)
references Cart (Cart_ID)
ON Update Cascade;

