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
