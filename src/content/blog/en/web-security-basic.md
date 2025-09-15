---
title: "Web Security: The Basics"
description: "An introduction to the fundamental concepts of web security, including common threats, best practices, and essential tools."
pubDate: "2025-08-12"
heroImage: "/cibersecurity-basic/logo.jpg"
tags: ["web_development"]
featured: true
---

## 1. Introduction

Cybersecurity is a crucial topic in modern application development. The security of data and user trust depend on it. In this article, we'll explore the basic concepts of web security, from the most common threats to the best practices for protecting your applications.
I will focus mainly on web application security, although many of the concepts are applicable to other types of software.

If you're in the development world, you've probably heard about the Tea App case, an application where women shared their dating experiences about men. A 4chan user discovered not just a vulnerability, but that the Firebase database was completely exposed. The result? Over 70,000 women were exposed, including their names, photos, and personal experiences. A total disaster that could have been prevented with good security practices. All of this could have been avoided with proper database security, as it was, as I said, completely exposed.
Cases like this are more common than we think. That's why it's essential to understand the basic concepts of web security.

## 2. Common Vulnerabilities

First, let's look at the most common vulnerabilities affecting web applications. These are some of the most critical ones:

### 2.1 SQL Injection

I think we all know what I mean by SQL Injection, but just in case:
SQL Injection is an attack technique that allows an attacker to execute malicious SQL code on a database through unvalidated input. For example, if you have a login form that doesn't properly validate data, an attacker could inject SQL code to access sensitive information.

A vulnerable example would be:

```sql
SELECT * FROM users WHERE username = '$username' AND password = '$password';
```
In this example, if `$username` or `$password` contains malicious SQL code, the attacker could manipulate the query to gain unauthorized access to the database, for instance by using `1=1` which is always true.
The solution is to use **prepared statements** or an ORM (Object-Relational Mapping) that handles data sanitization automatically. This prevents SQL code from being constructed insecurely.

A secure statement would be:

```sql
SELECT * FROM users WHERE username = ? AND password = ?;
```
This ensures that the data is treated as parameters and not as part of the SQL code, thus preventing injection.

### 2.2 XSS (Cross-Site Scripting)

XSS is a vulnerability that allows an attacker to inject malicious scripts into web pages viewed by other users. This can lead to the theft of cookies, sessions, or even redirection to malicious sites. This is very dangerous because by stealing your cookies, an attacker can impersonate you in the web application, allowing them to bypass the authentication process and access your account without issue.

There are several types, such as Stored XSS, where the malicious script is stored on the server and executed every time a user visits the page, or Reflected XSS, where the script is reflected in the URL and executed immediately. There is also DOM-based XSS, where the script is executed in the user's browser without going through the server.

For example, if a user posted a comment containing a malicious script:

```html
<script>alert('Stealing data');</script>
```

This script would run in the browser of any user who views that comment, potentially compromising their security.

### 2.3 innerHTML vs. textContent

If you've worked with JavaScript, you've surely heard of `innerHTML` and `textContent`. The difference is crucial for security:

As we've said, inserting unsanitized HTML can lead to XSS. For example, if you use `innerHTML` to insert content into a page:

```javascript
document.getElementById('output').innerHTML = userComment;
```

If `userComment` contains malicious HTML, it will be executed in the user's browser, which can compromise their security.

On the other hand, `textContent` treats the content as plain text, meaning any HTML code will be displayed as text and not executed:

```javascript
document.getElementById('output').textContent = userComment;
```

This is much safer, as it prevents the execution of malicious scripts.
The main difference is that `innerHTML` interprets the content as HTML. For example, if we have:

```html
<div id="output"></div>
```
and then we do:
```javascript
document.getElementById('output').innerHTML = '<script>alert("XSS")</script>';
```
This will execute the script and show an alert. In contrast, if we use `textContent`:
```javascript
document.getElementById('output').textContent = '<script>alert("XSS")</script>';
```
This will display the text `<script>alert("XSS")</script>` as is, without executing it. Therefore, whenever possible, use `textContent` instead of `innerHTML` to avoid XSS vulnerabilities.

## 3. Sanitization Best Practices

As mentioned in the previous points, it's crucial to validate and sanitize input data before processing it. Here are some best practices:

For example, if you have a registration form, make sure to validate the email format and sanitize any text input to prevent code injection.

It's also important to avoid concatenating HTML or SQL directly. Instead, use sanitization functions that remove or escape dangerous characters like `<`, `>`, `&`, etc. This helps prevent injection and XSS attacks.

## 4. Extra Layers of Protection (Defense in Depth)

### 4.1 Content Security Policy (CSP)

CSP is a powerful tool for preventing XSS and other code injections. This tool allows you to define which content sources are safe and which are not. For example, you can specify that only scripts from your own domain are allowed and block any external scripts. As you can imagine, this is an extra layer of security that helps mitigate the risks of XSS and other code injection-related vulnerabilities.

It's also another layer that helps if the previous measures fail. CSP acts as a second line of defense, blocking any unauthorized content before it runs in the user's browser.

So, how can I implement it?

It's important to configure CSP correctly on your web server. For example, in Apache or Nginx, you can add an HTTP header that defines your security policy:

```apache
Header set Content-Security-Policy "default-src 'self'; script-src 'self' https://apis.google.com; object-src 'none';"
```

This indicates that only scripts from the same origin and from `https://apis.google.com` are allowed, while all external objects are blocked. You can also use tools like [CSP Evaluator](https://csp-evaluator.withgoogle.com/) to check the effectiveness of your policy.

### 4.2 Secure Cookies: HttpOnly and Secure

Cookies are a fundamental part of web security, especially for authentication and session management. Here are two important attributes you should know:

- **HttpOnly**: This attribute prevents cookies from being accessed via JavaScript, which helps prevent XSS attacks. If a cookie has the `HttpOnly` attribute, it cannot be read by client-side scripts, reducing the risk of session hijacking.

This means you won't be able to access the cookie from JavaScript, which is a great security advantage. But you can from the server. Another important concept is the `Secure` attribute, which ensures the cookie is only sent over HTTPS connections, protecting it from "man-in-the-middle" attacks.

Example in PHP:

```php
setcookie("session", "value", [
    "httponly" => true,
    "secure" => true,
    "samesite" => "Strict", // This can have other values like Lax or None
    "expires" => time() + 3600, // In 1 hour
]);
```

Be careful, as not all cookies should be `HttpOnly`. For example, if you need to access a cookie from JavaScript for some specific functionality, you shouldn't mark it as `HttpOnly`. But for session or authentication cookies, it's a good practice.

### 4.3 Using Frameworks and Templating Engines

Modern frameworks help prevent XSS and CSRF (Cross-Site Request Forgery) by providing built-in security mechanisms. For example, many frameworks use templating engines that automatically escape data before rendering it in HTML, reducing the risk of malicious script injection.

To prevent XSS, for example in React:

```javascript
const userComment = "<script>alert('XSS');</script>";
return <div>{userComment}</div>; // This is safe, React escapes the content
```

This ensures that any potentially dangerous content is escaped and not executed as code, which is a great security advantage.

A brief explanation of CSRF:
CSRF is a type of attack where an attacker tricks an authenticated user into performing an unwanted action on a web application. For example, if a user is authenticated on a website and visits a malicious link, the attacker could make the user perform an action like transferring money or changing their password without their consent.
To prevent CSRF, many frameworks provide CSRF tokens that are included in forms and verified on the server. These tokens are unique to each session and are sent with each request, ensuring that the request comes from a legitimate source and not from an attacker trying to trick the user into performing unwanted actions.

For example, imagine you are on your bank's website (bank.com) and are logged in. If you visit a malicious site (malicious.com) that tries to make a money transfer to the attacker's account, the browser will automatically send your bank's session cookies with the request, which could allow the attacker to perform the transfer without your consent.

But for CSRF, there are other alternatives like using CSRF tokens that are sent with each request and verified on the server. This ensures that requests come from legitimate sources and not from an attacker trying to trick the user. In Laravel, for example, you can use `@csrf` to generate a CSRF token in your forms:

```blade
<form method="POST" action="/transfer">
    @csrf
    <input type="hidden" name="amount" value="100">
    <button type="submit">Transfer</button>
</form>
```

## 5. Communication and Authentication Security

### 5.1 Password Management: Hashing vs. Encryption

This is a concept that often causes confusion, I even had to look it up several times to explain it well. The difference between hashing and encryption is crucial for password security:

In hashing, data is transformed into a fixed-length value that cannot be reversed. This means you can't get the original password from the hash. For example, if you use bcrypt or Argon2 to hash passwords, the result is a unique hash that represents the password, but you can't go back and get the original password.

```php
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
// there is no password_dehash or something similar, it's one-way
```

In contrast, encryption is a reversible process. You can encrypt data and then decrypt it to get the original information. This is useful when you need to recover sensitive data, like forgotten passwords, but it also presents risks if the encryption keys are compromised.

For example, if you use AES to encrypt a password, you can decrypt it later if needed:

```php
$encryptedPassword = openssl_encrypt($password, 'aes-256-cbc', $key, 0, $iv);
// To decrypt
$decryptedPassword = openssl_decrypt($encryptedPassword, 'aes-256-cbc', $key, 0, $iv);
```

So, what is each one for?
Hashing is ideal for storing passwords, as you don't need to recover the original password, only verify if the hash matches the hash of the password entered by the user. In contrast, encryption is useful for data you need to recover later, like sensitive information that must be protected but accessible.

Another concept we could talk about in the case of hashes is "salting". Salting is a technique that adds a random value (the "salt") to the password before hashing it. This helps prevent dictionary and rainbow table attacks, because even if two users have the same password, their hashes will be different due to the unique salt.

```php
$salt = bin2hex(random_bytes(16)); // Generate a random salt
$hashedPassword = password_hash($salt . $password, PASSWORD_BCRYPT);
```

This ensures that even if two users have the same password, their hashes will be different, making brute-force attacks more difficult and improving the overall security of the system.

### 5.2 Public and Private Keys (Asymmetric Cryptography)

Keys are a fundamental concept in asymmetric cryptography, which is used to secure communication and authentication. In this model, each user has a pair of keys: a public one and a private one.

You can generate them very easily. For example, to generate an RSA key pair:

```bash
ssh-keygen -t rsa -b 2048 -f mykey
```

The public key can be shared openly, while the private key must be kept secret. Asymmetric cryptography allows data to be encrypted with the public key and decrypted with the private key, ensuring that only the owner of the private key can access the data.

A simple analogy would be having a safe with two keys: one that anyone can use to lock the safe (public key) and another that only you have to open it (private key). This ensures that only you can access what's inside the safe.

One thing we haven't explained is the difference between symmetric and asymmetric cryptography. In symmetric cryptography, the same key is used to encrypt and decrypt data, which means both parties must share the same secret key. This can be a problem if the key is compromised. That's why asymmetric cryptography is more secure, as each user has their own private key that is never shared.

These keys are also used in security protocols like SSL/TLS to secure communication between servers and clients. For example, when you visit a secure website (HTTPS), the server sends its public key to the browser, which uses it to encrypt the data sent to the server. Only the server can decrypt that data with its private key, ensuring secure communication.

They are also used in digital signatures, where a message is signed with the sender's private key and verified with their public key. This ensures the authenticity of the message and that it has not been altered during transmission.

And finally, it can also be used to securely access your servers. For example, if you have an SSH server, you can set up key-based authentication to access it without passwords. This is more secure and convenient, as you don't have to remember complex passwords.

## 6. Secure Server Configuration

### 6.1 CORS (Cross-Origin Resource Sharing)

CORS is a security mechanism that allows servers to control which domains can access their resources. By default, browsers block cross-origin requests to protect user security. However, sometimes it's necessary to allow certain domains to access your resources.

An example of a bad configuration would be allowing all origins:

```http
Access-Control-Allow-Origin: *
```

This allows any website to access your resources, which can be a security risk if not properly controlled. This is fine if your API is public, or if you are developing an application that needs to access resources from different domains. But if your API is private or sensitive, you should restrict the allowed origins.

```http
Access-Control-Allow-Origin: https://example.com
```

Here we only allow `https://example.com` to access our resources, which is much more secure. This means that only requests from `https://example.com` will be accepted, while any other request will be blocked by the browser.

For example, if we make a fetch from a different domain:

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

If the CORS configuration does not allow the origin of the domain from which the request is made, the browser will block the request and show an error in the console. This is a security measure to prevent malicious sites from accessing your resources without authorization.

### 6.2 Minimum Permissions and Privileges

Now it's time to talk about minimum permissions and privileges. This is not so much about web security, but in the end, your website has to be hosted somewhere, and it's important that the server is configured correctly.
The principle of least privilege is a security principle that states that each user or process should have only the permissions necessary to perform its task. This helps minimize the risk of an attacker gaining unauthorized access to sensitive resources or performing malicious actions on the system.

First, let's look at the most common tools for managing permissions in Unix/Linux systems:

With `ls` you can see the permissions of a file:

```bash
ls -l file.txt
```

This will show something like:

```
-rw-r--r-- 1 user group 0 Aug 10 12:00 file.txt
```

Here, the permissions are divided into three groups: owner, group, and others. Each group has read (r), write (w), and execute (x) permissions. In this example, the owner has read and write permissions, the group has read permissions, and other users have read permissions.

To change the permissions of a file, you can use the `chmod` command:

```bash
chmod 644 file.txt
```

To change permissions, we can use octal or symbolic notation. In this case, 644 means the owner has read and write permissions, while the group and other users have read permissions.

Each number in octal notation represents a set of permissions:
- 4: Read (r)
- 2: Write (w)
- 1: Execute (x)
- 0: No permissions

To change the owner of a file, you can use the `chown` command:

```bash
chown user:group file.txt
```

This will change the owner of the file to `user` and the group to `group`. It's important to ensure that files and directories have the correct owners and groups to prevent unauthorized access.

As I said, this is especially important on web servers, where files and directories must have the proper permissions to prevent unauthorized users from accessing sensitive information or performing malicious actions.

Some files you need to be especially careful with are:
- Server configuration files (like `nginx.conf` or `.htaccess`)
- Database configuration files (like `config.php` or `database.yml`)
- Log files that may contain sensitive information
- Files with passwords or API keys like `.env` or `config.json`
- Administration or maintenance scripts that should not be publicly accessible

## 7. Things to Keep in Mind

Other things to keep in mind are:

- **Regular Updates**: Keep your software and dependencies updated to avoid known vulnerabilities.
- **Hire Security Experts**: If your application handles sensitive data, consider hiring a security expert to perform audits and penetration testing.
- **Continuous Education**: Cybersecurity is a constantly evolving field. Therefore, it's important to stay updated on the latest threats and best practices. Attend conferences, read blogs, and follow security experts to learn about new vulnerabilities and defense techniques.
- **Package and Dependency Updates**: Use tools like `npm audit` or `pip-audit` to identify and update vulnerable dependencies in your projects. If you use GitHub, it often alerts you to vulnerabilities in your dependencies and provides a solution to fix them.
- **SSH**: We've talked about permissions and public/private keys before, but it's important to mention that SSH is an essential tool for secure server administration. Use key-based authentication and disable password access to improve security. A secure SSH configuration also includes disabling direct root access and changing the default port (22) to a custom one to reduce the risk of automated attacks.

## 8. Conclusion and Resources

Web security is a complex but essential topic for any developer. By understanding common vulnerabilities, applying good sanitization practices, and using appropriate security tools, you can protect your applications and data from potential attacks.

Here are some recommended resources to delve deeper into the topic:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/): A list of the most critical vulnerabilities in web applications.
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/): A tool to evaluate the effectiveness of your Content Security Policy (CSP).
- [Cybersecurity course on Udemy](https://www.udemy.com/course/cybersecurity-for-beginners/): An introductory course that covers the basics of web security and how to protect your applications.
- [Cybersecurity course on Platzi](https://platzi.com/cursos/ciberseguridad/): A more advanced course that delves into defense techniques and common attacks on web applications.