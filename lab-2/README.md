#### Instruction to configure wildfly server

***

1. **Integrate with intellij**
    - Step 1: Download wildfly server (at my moment, the version is 20.0.1);
    - Step 2: Create new project and integrate web framework with that project;
    - Step 3: Choose `Edit Configuration` then add new template `Jboss Server`;
    - Step 4: Choose the unzip dir of downloaded file of wildfly server be `Jboss Home`;
    - Step 5: Choose tab `Deployment` then add `war:expoled`;
    - Final step: Build project and run server. 
    
    **Done.**
2. **Configure Wildfly Server Manually (or another way `on helios`)**
    - There is only 1 important file that we should concern about. That is `standalone.bat.config`, we 
    should configure our port base in that file;
    - After that deploy ***WAR*** into server by using portbase for admin (before using this we should create user 
    by running `add-user.bat` in /bin);
    - There here we go, for using port base that run in localhost (or uni server), but we 
    are not in uni, it's will be solved by create tunnel between localhost in uni server and 
    our localhost. Follow this instruction: https://picloud.pw/post/262/
    
    **Done.**
    
***
    
##### Enjoy my laboratory.
    
    
    
         