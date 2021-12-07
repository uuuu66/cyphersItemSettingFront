# next js를 이용한 item setting App



## 캐릭터 목록
![스크린샷(430)](https://user-images.githubusercontent.com/64532732/145070938-eecb27b9-00ad-4e72-ae16-51f8bc770117.png)

캐릭터 목록은 네오플에서 캐릭터 전체목록을 제공해주지 않기 때문에 
제가 직접 작성한 캐릭터 영어이름 목록을 통해 api를 호출하여
getstaticprops로 캐릭터의 이미지와 캐릭터 코드를 가져옵니다.

## 아이템 목록
![스크린샷(431)](https://user-images.githubusercontent.com/64532732/145070956-217ff491-d42e-4bd5-9f1e-790aca758ac2.png)


아이템 목록도 네오플에서 전체목록을 제공해주지 않기 때문에
[사이퍼즈 아이템박스](http://cyphers.nexon.com/cyphers/game/item/itembox)
여기서 크롤링해서 아이템 전체목록을 미리 json파일로 작성해둔 후
nextjs에서 정의한 자체 api로 각 캐릭터의 아이템 목록을 가져옵니다.
### 상세보기

![스크린샷(429)](https://user-images.githubusercontent.com/64532732/145071238-63b200c2-a6b4-469d-b9b8-9e04b3123d15.png)

### 간략보기
 
![스크린샷(428)](https://user-images.githubusercontent.com/64532732/145071266-c0474e7d-9194-4d55-bd01-a65439890ab4.png)

### 검색

![스크린샷(435)](https://user-images.githubusercontent.com/64532732/145071295-5163d84b-b1c4-4dfd-b2cf-806597c04cb6.png) ![스크린샷(436)](https://user-images.githubusercontent.com/64532732/145071281-a6e3b26f-2806-4404-bda9-0b1d0af09fe7.png)


## 아이템 슬롯
### 생성/삭제
  아이템 슬롯은 여러개 생성하거나 삭제할 수 있습니다.
  ![스크린샷(438)](https://user-images.githubusercontent.com/64532732/145071374-a1dcfeff-b3eb-42a0-8db7-8569da0a5ee3.png)
  
  ### 고정/해제

  ![스크린샷(432)](https://user-images.githubusercontent.com/64532732/145071408-7bd9ad9d-c9f7-4ca8-a662-0a8f8f3ec250.png)
  
  아이템 슬롯은 왼쪽에 고정시킬 수 있고 최대화 시키거나 최소화시킬 수 있습니다.
  
  ![스크린샷(433)](https://user-images.githubusercontent.com/64532732/145071482-7a36f7ab-e077-4bde-b3e7-a9a7f283d0f4.png)
 
### 저장/불러오기
  디스크 버튼을 누르면 텍스트 파일로 저장되며, 텍스트 파일 맨 밑의 코드로 불러올 수 있습니다.
 #### 저장
  ![스크린샷(440)](https://user-images.githubusercontent.com/64532732/145071570-173f65b4-df22-4f6d-b74e-145b3453edfc.png)
####  불러오기  
  ![스크린샷(441)](https://user-images.githubusercontent.com/64532732/145071607-df124aa9-58ba-4ab1-b149-00365a6130e8.png) 
## 반응형
  ![스크린샷(442)](https://user-images.githubusercontent.com/64532732/145071699-93b24c54-3147-4248-ad7b-b80d28d4537c.png)
  화면 크기에 맞게 반응합니다.
  
## 배포
  현재 vercel 에서 hobby plan으로 배포중입니다. 

