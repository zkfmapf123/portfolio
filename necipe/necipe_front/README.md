https://github.com/zkfmapf123/necipe_front.git<h1> necipe front 개발 일정 </h1>

<h3> Tech Stack </h3>
<li> react-native, typescript </li>
<li> redux, redux-thunk, fetch </li>
<li> styled-components </li>
<li> React hooks </li>

- [ ] auth (인증 뷰)

- [ ] home (홈 뷰)

- [ ] search (검색 뷰)

- [ ] user (유저 뷰)

- [ ] alert (알림 뷰)

- [ ] profile (개인 정보 뷰)

- [ ] comment (댓글 뷰)

- [ ] recipe ( 레시피 뷰)

- [ ] trouble shootings
 - [ ] jsx rendering 문제
 - [ ] image upload
 - [ ] flatlist
 - [ ] 최적화

- [ ] 추후 예정중인 서비스
  - [ ] explore
  - [ ] 댓글 기능 확대
  - [ ] 파도 타기
  - [ ] 찜목록에서 검색 추가
  ...


```

- 카테고리
- 한식
- 양식
- 일식
- 간식
- 채식
- 자취요리
- 파티요리
- 다이어트
- 명절음식
- 베이킹

6. 검색하면 띄워라..

7. 메인화면 --> 옆으로 넘기는 거 없으면 뺄거다.

8. 게시글에서 이미지가 나오면, background 이미지가 없게끔,

9. 시간등록 뷰 스크롤해서 시간을 정할 수 있게끔

10. 검색화면 정렬 ==> 인기순(좋아요), 최신순(created_datetime), 가격순 

- 4p : 5가지 없애고, 조정스
- 5p : nTips 스크롤뷰로 해라 (넘기면)
- 6p : 최근 게시글, (홈 피드랑 똑같이, (댓글))
- 7p : (댓글버전으로 하나 보내준다.) , 댓글은 오른쪽으로 밀어가지고 없앤다.
- 8p : 밑에 저거 있어야 한다. (bottom 그림) 댓글시간은 오늘 기준으로 ~~시간, 오늘지나면 날짜로 나온다.
- 9p : 좋아요, 찜을 이용해서 --> **오늘 하자.
- 10p : 최근검색, 인기검색 4~5개 나오게끔 
- 17p : 검색어 부분 xd 처럼 하게끔하고, 시간을 vertical 스크롤 뷰
- 20p : 


-------------------------------------- comment createChildComment 고쳐야된다.

- redux-thunk => fetch api 로 바꾼다. 
- redux-thunk => redux ==> home, mainCreate, subCreact

```

1. useEffect 이전에 함수호출시에는 useMemo() 이다. 즉

useMemo => useEffect => clean up

useMemo(()=>{

  // useMemo
},[]);

useEffect(()=>{
  // useEffect

  // clean up
   return()=>{

   }
},[]);

// 근데 이렇게 해도 jsx렌더링이 나중에 하지만, jsx 렏더링이 반영이 안되다.
그래서 useState에다가 애초에 기본값을 안주는 방법을 사용하면 무조건 된다....
기본값을 지금까지 왜 줬지?

const [value, setValue] = useState<>(); //이렇게 기본값을 정의하지 말자

{
  value &&
  ...
}

```

```
flatlist rerendering 문제

1. onEndReach 설정 (효과적이지 않음)

2. pagination 조금 주기 (근본적인 해결 책 아님)

[이동규] [오전 12:46] VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate

3. 해당에러 분석 --> pureComponent를 분석하기 시작
class -> pureComponent
fucntion -> React.memo

기본적인 얕은비교를 통하여 rerendering을 방지한다. (해결)

```

- [ ] comment 정리하기 --> React.useMemo를 하나 더 만들어야할듯? --...
  댓글 부분 어떻게 만들지?
ㄴ

- [ ] alert
- [ ] 찜목록 (게시글 이동)
- [ ] 댓글부분 *
- [ ] Profile (게시글, 친구)

```
