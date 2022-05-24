## Directory Indexing with Nginx

> 파일 리스트 서버를 만들기 위한 용도로 사용된다.
> static 리소스를 담고 서빙하는 용도나 빌드 후 릴리즈 파일들을 넣는 용도로 사용할 수 있다.

```bash
server {
	server_name test.domain.com;

	location = / {
        # root 경로에 있는 파일을 화면에 띄워준다.
        # root vs alias
        # - root: location에 매칭된 부분을 root 경로에 추가하여 조회한다.
        # - alias: location에 매칭된 부분은 없애고 항상 alias에서 설정한 경로의 파일들을 autoindex 한다.
        root /var/datas;
        # autoindex 옵션으로 indexing 설정을 해준다.(default: off)
        autoindex on;
	}
}
```
