# 지속적으로 수정해나갈 예정입니다.

# 지원자의 성명

김태현

# 애플리케이션의 실행 방법 (엔드포인트 호출 방법 포함)

1. 의존성 설치

   npm install

2. root 경로에서 어플리케이션 실행

   npm start

# 데이터베이스 테이블 구조

<img width="840" alt="스크린샷 2023-08-08 오후 7 20 06" src="https://github.com/taehyunkim44/wanted-pre-onboarding-backend/assets/101853993/4fc18f3a-9764-4620-ae7f-5e3bb4a4a7bc">

# 구현한 API의 동작을 촬영한 데모 영상

https://youtu.be/KvKyTGJ2zWg
a

# 구현 방법 및 이유에 대한 간략한 설명

1. Sequelize

   - Sequelize는 Node.js 기반의 ORM으로 MySQL과의 원활한 호환성, 쿼리의 단순화, 마이그레이션 및 스키마 관리가 용이하다는 점에서 선택하게 되었습니다. 또한 Sequelize에서 제공하는 timestamp 와 paranoid 기능으로 레코드의 생성,수정,삭제 시간을 쉽게 관리 할수 있기에 선정하게 되었습니다.

2. Functional

   - 다른 프레임워크들과 다르게 형식에 구애되지 않는 express의 특징과 javascript 특성상 class 기반의 구현보다는 functional 하게 구현하는 것이 맞다고 생각하여 functional 하게 코드를 구현하였습니다.

3. JWT webtoken

   - 클라이언트의 상태를 서버에 저장하지 않아도 된다는 장점과 보안성, 확장성을 고려하여 JWT 인증방식을 사용하였습니다.

4. 비밀번호 해싱 처리

   - Sequlize의 hooks의 beforeCreate 기능을 이용하여 레코드 생성 전 비밀번호를 안전하게 저장하기 위해 단방향 해싱 처리를 하는 bcrypt 라이브러리를 이용하여 user의 비밀번호를 해싱 처리하여 저장하였습니다.

5. Soft Delete 방식 사용
   - soft delete는 실제 데이터를 완전히 삭제 하는 방식이 아닌 API 실행 시 DB에서 데이터를 인식하지 못하게 하는 방식으로 paranoid:true 로 설정한 후 delete 요청으로 호출하여 데이터를 삭제하였다고 해도 데이터가 삭제되지 않고 deletedAt에 삭제된 시간만 찍히는 방식입니다. 이 방법으로 삭제된 데이터를 불러와야 할 경우 다시 데이터를 복구할 수 있습니다.

# API 명세(request/response 포함)

1. 사용자 회원가입

- HTTP method: POST
- Endpoint: /api/users/register
- Request: {"email":"test@naver.com","passowrd":"test1234"}
- Response: {
  "message": "회원가입이 성공적으로 완료되었습니다.",
  "user": {
  "id": 7,
  "email": "test1@naver.com",
  "password": "$2b$10$wI2GXT5kOExTBHQsrO/KeO9DjZBZg1255fC2n1gnxry4AM1eeURYu",
  "updatedAt": "2023-08-15T10:20:56.152Z",
  "createdAt": "2023-08-15T10:20:56.152Z"
  }
  }

2. 사용자 로그인

- HTTP method: POST
- Endpoint: /api/users/login
- Request: {"email":"test1@naver.com","passowrd":"test1234"}
- Response: {
  "message": "로그인에 성공했습니다.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ0ZXN0MUBuYXZlci5jb20iLCJpYXQiOjE2OTIwOTUwMjgsImV4cCI6MTY5MjA5ODYyOH0.bpYiG2yYevq68lX0tt7Vsa2IN5l6acfuQd34yBHPRJg"
  }

3. 새로운 게시글 생성

- HTTP method: POST
- Endpoint: /api/posts
- Request: {"title":"제목1","content":"내용1"}
- Response: {
  "message": "게시글이 성공적으로 작성되었습니다.",
  "post": {
  "id": 6,
  "title": "제목1",
  "content": "내용1",
  "updatedAt": "2023-08-15T10:26:24.113Z",
  "createdAt": "2023-08-15T10:26:24.113Z"
  }
  }

4. 모든 게시글 조회

- HTTP method: GET
- Endpoint: /api/posts?page=1
- Request: 페이지네이션으로 page 당 10개의 게시물 조회 query 방식으로 page 요청
- Response: {
  "posts": {
  "count": 3,
  "rows": [
  {
  "id": 4,
  "title": "제목2",
  "content": "내용2",
  "createdAt": "2023-08-15T06:38:28.000Z",
  "updatedAt": "2023-08-15T06:38:28.000Z",
  "deletedAt": null
  },
  {
  "id": 5,
  "title": "제목3",
  "content": "내용3",
  "createdAt": "2023-08-15T06:38:36.000Z",
  "updatedAt": "2023-08-15T06:38:36.000Z",
  "deletedAt": null
  },
  {
  "id": 6,
  "title": "제목1",
  "content": "내용1",
  "createdAt": "2023-08-15T10:26:24.000Z",
  "updatedAt": "2023-08-15T10:26:24.000Z",
  "deletedAt": null
  }
  ]
  }
  }

5. 특정 게시글 조회

- HTTP method: GET
- Endpoint: /api/posts/:id
- Request: param 방식으로 id로 요청
- Response: {
  "post": {
  "id": 5,
  "title": "제목3",
  "content": "내용3",
  "createdAt": "2023-08-15T06:38:36.000Z",
  "updatedAt": "2023-08-15T06:38:36.000Z",
  "deletedAt": null
  }
  }

6. 특정 게시글 수정

- HTTP method: PUT
- Endpoint: /api/posts/:id
- Request: {
  "title":"바꿀 제목",
  "content":"바꿀 내용"
  }
- Response: {
  "message": "게시글이 성공적으로 수정되었습니다.",
  "post": {
  "id": 5,
  "title": "바꿀 제목",
  "content": "바꿀 내용",
  "createdAt": "2023-08-15T06:38:36.000Z",
  "updatedAt": "2023-08-15T10:33:42.113Z",
  "deletedAt": null
  }
  }

7. 특정 게시글 삭제

- HTTP method: DELETE
- Endpoint: /api/posts/:id
- Request: param 방식으로 id로 요청
- Response: {
  "message": "게시글이 성공적으로 삭제되었습니다."
  }
