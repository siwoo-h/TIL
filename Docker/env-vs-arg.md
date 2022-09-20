# ENV vs ARG

## ENV

- 런타임에 설정되는 변수
- 선언 방법: ENV VAR="VAR", ENV VAR "VAR"
- 호출 방법: $VAR, ${VAR}

## ARG

- 빌드 타임에 설정되는 변수
- 선언 방법: ARG VAR="VAR", ARG VAR "VAR"
- 호출 방법: $VAR, ${VAR}