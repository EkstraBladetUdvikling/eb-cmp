# eb-cmp

Ekstra Bladet CMP packaged in a container for use as an external component.

## How to include

Including the CMP requires a Varnish server with esi.[test-]ekstrabladet.services backend defined with a prefix mapping of  /ext_component/ and ESI processing activated.

With those prerequisites in place the component is included with the following include directive:

```html
<esi:include src="/ext_component/cmp/include.html"/>
```

## Docker

Using the resulting docker image requires the environment variable

FULL_URL_TO_EB_CMP_JS

set to the URL where the eb-cmp.js file should be served from.

The common scenario where the container is used as an external component on ekstrabladet.dk and related sites using the relative path /ext_component/cmp/eb-cmp.js makes the JS file local to the site where the compoent is served as it will be proxied through the Varnish server.

Building the image locally can be done using

```sh
docker build -t eb-cmp .
```

And running it

```sh
docker run -it --rm -p 8080:80 -e FULL_URL_TO_EB_CMP_JS=http://localhost:8080/cmp/eb-cmp.js eb-cmp
```
