<h1> 네시피 개발 서버 </h1>

<h3> 1. Tech Stack </h3>
<ul>
  <li>backend   : nodejs (es6 + typescript)</li>
  <li>database  : mysql + redis</li>
  <li>testing   : mocha + travis ci</li>
  <li>devops    : pm2 & docker + nginx</li>
  <li>cloud     : aws ec2 + aws beanstalk</li>
  <li>개발일정   : 2021.6.10 ~ 2021.7.31</li>
</ul>

<a href="https://github.com/zkfmapf123/necipe_front"> necipe front github (네시피 깃허브 주소) </a>

<h3> 2. todo </h3>

- [x] auth

- [x] home (메인)
  - [x] good     (좋아요)
  - [x] favorite (찜) 
 
- [x] search    (검색)
  - [x] use hahstag (해쉬태그를 이용한 검색)
  - [x] use category (카테고리를 이용한 검색)
  - [x] 인기검색 5개
   
- [x] user  (유저 조회) (진행 중)
  - [x] 유저 개인 정보
  - [x] 유저 좋아요 많은 순 5개
  - [x] 유저 좋아요 많은 hashtag
  - [x] 유저 최신글 기준 pagination
  - [x] 좋아요 신청
  
- [x] alert (진행 중)
  - [x] alert view
  - [x] 친구 신청
  - [x] 친구 거절

- [ ] comment (댓글)
  - [x] read 
  - [ ] get child (자식댓글들 가져오기)
  - [x] create
  - [x] delete
   
- [ ] recipe  
  - [x] create (레시피 만들기)
  - [x] read   (레시피 조회)
  - [x] delete (레시피 삭제)
   
- [x] profile (개인 정보 조회)
- [ ] explore (탐색)  

- [ ] log
  - [ ] 친구신청 로그
  - [ ] 댓글 로그

- [x] good and favorite
  - [x] 좋아요 등록, 삭제
  - [x] 찜하기 등록, 삭제