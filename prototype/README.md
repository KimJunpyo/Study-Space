## prototype과 closure, factory 패턴의 활용 예시

1. 동물의 이름과 타입을 갖고 이름을 호출하는 Animal 함수
2. 강아지의 이름을 받고 짖는 행동을 제어하는 Dog 함수
3. Dog 함수를 통해 인스턴스를 생성하고 객체 obj에 저장
4. 객체 obj에서 프로토타입으로 상속받은 sayName, bark를 추출
5. 강아지의 종류를 반환하는 sayDogType 함수를 포함하여 팩토리 패턴으로 새로운 객체를 생성하여 반환

obj는 closure로서 외부에서 name과 type을 직접적으로 접근할 수 없음
