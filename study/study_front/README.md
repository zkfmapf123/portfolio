# 개수작 Front

## Description
```
초,중,고등학생들을 위한 자기공부 관리 앱이다.
nodejs + React_native(react-native-navigation) 으로 작업하였다.
```
<a href="https://github.com/zkfmapf123/study"> 개수작 Backend Github</a>

### 1. Architecture & Design
```
1. 날짜별로 할일목록 과 세부적으로 해당 시간의 할일 까지 작성 가능하게 기획하였다.
2. 시간체크 기능을 이용하여 자신이 공부할 태그를 추가하고, 타이머 기능을 이용하여 공부 시간을 측정한다.
4. 오늘공부시간과, 어제의 공부시간을 비교할 수 있다
5. 일주일간의 공부시간 및 과목별로의 %비율로 통계기능을 볼 수 있다. 
```
![000vav](https://user-images.githubusercontent.com/47292546/114263713-2bd6e000-9a22-11eb-8769-cb28beed8a75.PNG)


### 2. React-Native
<a href="https://reactnative.dev/docs/getting-started">![react](https://user-images.githubusercontent.com/47292546/114263794-8f610d80-9a22-11eb-9720-f56a99ea6946.PNG)
</a>

<a href="https://blog.naver.com/zkfmapf123/222146785347">왜 나는 react-native를 선택하게 되었나? (네이버 블로그)</a>

### 3. React-native-navigation

#### 1) Drawer-Navigation

##### DrawerNavigator
![drawer](https://user-images.githubusercontent.com/47292546/114264011-668d4800-9a23-11eb-9073-af98c08b236a.PNG)

##### DrawerContent
![drawerContent](https://user-images.githubusercontent.com/47292546/114264019-70af4680-9a23-11eb-8c49-aa5740fa0fb8.PNG)

### 4. Trouble Shooting

#### 1) view Rednering문제 
```
서버에서 데이터를 받아 올 때, RN상에서 먼저 화면이 출력되는 현상이 발생하였다.
그렇기 때문에 서버에서 데이터를 받아 온후 로직을 처리 할때 까지 로딩뷰를 발생시키기로 하였다.
```

##### useState 사용하여 초깃값 설정

![이거먼저](https://user-images.githubusercontent.com/47292546/114264222-a1dc4680-9a24-11eb-821a-9cb7b5fb07a6.PNG)

##### useEffect를 사용하여 뷰 실행시 서버랑 연결 시도

![두번째](https://user-images.githubusercontent.com/47292546/114264230-ac96db80-9a24-11eb-91f6-2bc75629e8a3.PNG)

##### 서버랑 연결하고 async/await 이용하여 함수들이 동기적으로 운용할수 있도록 구성

![서버에서_가져옴](https://user-images.githubusercontent.com/47292546/114264592-b9b4ca00-9a26-11eb-961a-77f7c9d681db.PNG)

##### 조건문을 이용한 화면 렌더링

![load](https://user-images.githubusercontent.com/47292546/114264483-31362980-9a26-11eb-95bb-c68c1d3e63ee.PNG)
  

#### 2) Timer 함수
```
setInterval 함수를 이용하여 타이머 구현

    const countRef = useRef(null);
...

// 타이머 시작 함수
    const start = () =>{
        setStep("pause");

        countRef.current = setInterval(()=>{
            setTimeNumber(timeNumber++);
            convertTime(timeNumber);
        },1000);
    }

// 타이머 정지 함수
    const pause = () =>{
        clearInterval(countRef.current);
        setStep("start");
    }

```

#### 3) Navigation 이동간의 초기화
```
Navigation 이동간에 초기화가 되지 않아, 업데이트가 이뤄지지 않았다.
새로고침 버튼을 이용하는 방법도 있엇지만, CommonAction을 이용하여 Navigation간의 초기화를 진행하였다.

navigation.dispatch(CommonActions.navigate("TimeCheck"));
```

#### 4) 뒤로가기 버튼 발생시 앱 내부에서 종료로직 처리
```
뒤로가기 버튼을 눌렀을 시, 바로 앱이 꺼지는 현상이 발생하였다.
그렇기 때문에 BackHandler 메서드를 발생시켜서, 앱 내부에서 다시한번 처리를 진행하였다.
```

```
//timer.tsx에서 뒤로가기시 자동적으로 clearInterval() 발생 후 Navigation을 발생시킨다.

    useFocusEffect(
        useCallback(()=>{
            const onBackPress=()=>{
                navigation.dispatch(CommonActions.navigate("TimeCheck"));
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress',onBackPress);
            return ()=>{
                Promise.resolve()
                .then(()=>clearInterval(countRef.current))
                .then(()=>serverRegister())
                .then(()=>BackHandler.removeEventListener('hardwareBackPress',onBackPress));
            }
        },[]),
    );   
```

<a href="https://play.google.com/store/apps/details?id=com.study_ant">개수작 구글 </a>

