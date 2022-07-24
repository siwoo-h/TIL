# Gihub Issue Template

## Github Issue

프로젝트를 진행하면서 발생하는 이슈를 정리할 수 있는 공간이다.<br>
이슈의 종류로는,

- 버그: 기능이 예상된 결과와 다른 경우
- 요구사항 추가/수정: 기획 시나리오가 변경되었거나, 시나리오 상 누락된 API가 있는 경우
- 기능, 설계, 문서 개선: 프로젝트의 개선 방향을 제시하는 경우
- 그 밖의 프로젝트 관련 질문들

이 공간을 활용했을 때 주요 이점으로는,

- 이슈 트래킹
- 커뮤니케이션 비용 절약

## Issue Template

목적에 맞는 템플릿을 활용했을 때, 효과는 배가 되더라!<br>
발급자도 폼에 맞게 작성하면 되어서 간편하고, 프로젝트 담당자도 이슈에 대한 정확한 맥락을 빠르게 파악할 수 있어서 불필요한 커뮤니케이션 비용도 줄일 수 있다.<br>

> 템플릿을 설정하는 방법은,
> `.github/ISSUE_TEMPLATE` 폴더에 YAML 파일의 템플릿을 구성한다.
>
> - `BUG_REPORT.md`
> - `FEATURE_REQUEST.md`

기본 템플릿 양식은 다음과 같다.

```
---
name: 템플릿 이름
about: 템플릿 설명
title: 기본 title
labels: 기본 labels
assignees: 기본 assignee (GitHub Username을 적어줍니다, 기본 설정을 원치 않으면 '' 공백으로 설정합니다.)
---
```

버그 리포트 템플릿 양식을 알아보자.

### Bug Report

```
---
name: Bug Report
about: Create a bug report to help improve this project
title: "bug: "
labels: 'bug'
assignees: ''
---
## 프로젝트 버전
## 발생 위치
## 현재 결과
## 기대 결과
## 재현 방법
## 스크린샷(관련 코드)
```

## 이슈가 해결되었다면, 커밋 메시지로 이슈 닫기

기본 브랜치에서 `KEYWORD #ISSUE-NUMBER` 문법으로 커밋메시지를 작성하면 이슈에 연결할 수 있다.<br>
키워드 종류

- close
- closes
- closed
- fix
- fixes
- fixed
- resolve
- resolves
- resolved

자세한 내용은 다음 문서([Linking a pull request to an issue using a keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword))를 참고하자.
