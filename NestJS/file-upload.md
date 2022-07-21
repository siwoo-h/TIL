# 파일 업로드

## 공식문서

파일 업로드는 공식 문서에서 소개하는 `multer` 미들웨어 패키지를 이용하였다.<br>
파일 유효성 검사하는 방법으로 `UploadedFile` 데코레이터와 함께 커스텀 pipe를 생성하라고 제안하고 있다.<br>

```js
// https://docs.nestjs.com/techniques/file-upload#file-validation

@Post('file')
uploadFileAndPassValidation(
  @Body() body: SampleDto,
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        // ... Set of file validator instances here
      ]
    })
  )
  file: Express.Multer.File,
) {
  return {
    body,
    file: file.buffer.toString(),
  };
}
```

이 예제도 제대로 실행이 안될 뿐더러 `UploadedFile` 데코레이터만으로는 예외 처리가 기대한대로 되지 않았다.<br>
요청에 파일이 제대로 전달되지 않은 경우의 예외 처리 조차 데코레이터에서 기본으로 제공하지는 않더라.<br>

> 예제를 실행해보지 못한 이유
> `ParseFilePipe` 는 제공 조차 하지 않았고, 구글링해도 공식문서에서 언급한 것 이외에 사용 예시를 찾을 수가 없었다.
> 아직도 발견하지 못했다.
