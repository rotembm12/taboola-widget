Hello,
A few explanations about the code:

1. used var instead const and let only because IE lower versions doesnt support the new syntax.
2. i didn't use promises in the http request because of IE support and i didnt want to overkill this task with polyfills and transpilers.
3. the code has 2 clamp functionalities, 1 for modern browsers and one for internet explorer browsers

Hope you will like it.
