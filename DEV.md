Remix Icon
----------

Remix Icon is a set of open-source neutral-style system symbols elaborately crafted for designers and developers.
All of the icons are free for both personal and commercial use.

https://react-icons.github.io/react-icons/icons?name=ri
https://github.com/Remix-Design/RemixIcon
https://remixicon.com/

Installation
Note: If you'd like to use Remix Icon with a CDN, you can skip this installation step.

npm install remixicon --save
import 'remixicon/fonts/remixicon.css'
import CSS to your main.js

Use
Add icon with class name, class name rule: ri-{name}-{style}

<i class="ri-admin-line"></i>
<i class="ri-admin-fill"></i>
Note: We changed the class name prefixes from remixicon- to ri from v2.0.0;

Note: You can go to remixicon.com to check the name of the icons. -line means the outlined style icon, and -fill means the filled style icon.

Sizing
RemixIcon can be resized by css class integrated by remixicon.css . Icons inherit the font-size of their parent container and with the following classes you can increase or decrease the size of icons relative to that inherited font-size. You can also use ri-fw class for a fixed width for icons. For example:

<div style="font-size: 24px;">
  <i class="ri-admin-line ri-fw"></i> <!-- fixed width -->
  <i class="ri-admin-line ri-xxs"></i> <!-- 0.5em -->
  <i class="ri-admin-line ri-xs"></i> <!-- 0.75em -->
  <i class="ri-admin-line ri-sm"></i> <!-- 0.875em -->
  <i class="ri-admin-line ri-1x"></i> <!-- 1em -->
  <i class="ri-admin-line ri-lg"></i> <!-- 1.3333em -->
  <i class="ri-admin-line ri-xl"></i> <!-- 1.5em -->
  <i class="ri-admin-line ri-2x"></i> <!-- 2em -->
  <i class="ri-admin-line ri-3x"></i> <!-- 3em -->
  ...
  <i class="ri-admin-line ri-10x"></i> <!-- 10em -->
</div>