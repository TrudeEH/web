---
title: HTTP [CURL]
description: 
draft: false
tags:
  - networking
  - tools
  - web
author: TrudeEH
showToc: true
---

## HTTP

HTTP (Hypertext Transfer Protocol) is a communication protocol used to send messages between the client and server, mainly used for the web. It's stateless, meaning each request is independent, which is why web browsers often use cookies to save state.

### Request Structure

1. **Request Line**: Method, URI, HTTP version (e.g., `GET /index.html HTTP/1.1`).
2. **Headers**: Metadata about the request.
3. **Body (Optional)**: Data for `POST`, `PUT`, `PATCH` requests.

### Response Structure

1. **Status Line**: HTTP version, status code, reason phrase (e.g., `HTTP/1.1 200 OK`).
2. **Headers**: Metadata about the response.
3. **Body (Optional)**: Response data (HTML, JSON, etc.).

### Methods

- **GET**: Retrieve a resource. Should only retrieve data and not have side effects.
- **POST**: Submit data to be processed.
- **PUT**: Replace a resource.
- **DELETE**: Delete a resource.
- **PATCH**: Partially modify a resource.
- **HEAD**: Retrieve headers only.
- **OPTIONS**: Describe communication options.

### HTTP Headers

**HTTP headers** are key-value pairs providing additional information about requests and responses.

#### Header Categories

- **General Headers**: Apply to both requests and responses.
- **Request Headers**: Information about the request context.
- **Response Headers**: Information about the response context.
- **Entity Headers**: Describe the body of the request or response.

#### General Headers

```Bash
Cache-Control: max-age=3600 # Specifies caching directives. (1 hour)
Connection: keep-alive      # Controls whether the network connection stays open.
Date: Tue, 09 Jul 2024 12:00:00 GMT  # Date and time of the message.
Transfer-Encoding: chunked  # Encoding for safe transfer.
Upgrade: HTTP/2             # Request to upgrade to another protocol.
Via: 1.1 proxy.example.com  # Indicates intermediate protocols and proxies.
```

#### **Request Headers**

```Bash
Accept: text/html, application/json  # MIME types the client can handle.
Accept-Encoding: gzip, deflate       # Supported encoding algorithms.
Accept-Language: en-US, en;q=0.9     # Preferred languages.
Authorization: Basic <credentials>   # Authentication credentials.
Cookie: sessionid=123456789          # HTTP cookies.
Host: www.example.com                # Domain name of the server.
Referer: https://www.example.com/page.html  # URL of the linking page.
User-Agent: Mozilla/5.0 ...          # Client software identifier.
```

#### Response Headers

```Bash
Access-Control-Allow-Origin: *     # Indicates whether the response can be shared with the given origin.
Content-Type: application/json     # MIME type of the response body.
Content-Length: 1024               # Size of the response body in bytes.
Content-Encoding: gzip             # Encoding used for the data.
Location: https://www.example.com/new-page  # Redirect URL.
Server: Apache/2.4.41 (Ubuntu)     # Server software identifier.
Set-Cookie: sessionid=987654321; Path=/; HttpOnly  # Sends a cookie from the server to the client.
```

#### Entity Headers

```Bash
Allow: GET, POST, PUT, DELETE  # Supported methods.
Content-Language: en-US        # Language(s) intended for the audience.
Content-Location: /index.htm   # URL where the entity was obtained.
```

#### Custom Headers

Custom headers can be defined for application-specific purposes, typically prefixed with `X-` (e.g., `X-Custom-Header: custom-value`).

## Common HTTP Error Codes

- `200` OK
- `301` Redirect (Moved to another location)
- `302` Found
- `304` Not Modified
- `307` Temporary Redirect
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `418` I'm a Teapot
- `500` Internal Server Error
- `503` Service Unavailable

## CURL

`curl` is a command-line tool used for transferring data with URLs. It supports a wide range of protocols, including HTTP, HTTPS, FTP, SFTP, and more.

### Usage

```Shell
# Fetches the content of <https://example.com> and prints it to standard output
curl https://example.com
# Saves the content to a file named output.html
curl -o output.html https://example.com
# Makes a POST request with URL-encoded data
curl -X POST -d "param1=value1&param2=value2" https://example.com/api
# Makes a POST request with JSON data
curl -X POST -H "Content-Type: application/json" -d '{"param1": "value1", "param2": "value2"}' https://example.com/api
# Makes a PUT request with JSON data
curl -X PUT -H "Content-Type: application/json" -d '{"key": "new_value"}' https://api.example.com/resource/123
# Sets an Authorization header for API authentication
curl -H "Authorization: Bearer YOUR_API_KEY" https://example.com/api
# Tells curl to follow HTTP redirects
curl -L https://example.com/redirecting-url
# Saves cookies received from the server to cookies.txt
curl -c cookies.txt https://example.com
# Sends cookies from cookies.txt to the server
curl -b cookies.txt https://example.com
# Provides basic authentication credentials (username:password)
curl -u username:password https://example.com/protected-resource
# Sets the maximum time to wait for a connection and the entire operation
curl --connect-timeout 10 --max-time 60 https://example.com
```
