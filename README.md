# MaizeNex

DOWNLOAD node.js for openWeather API
1. go to offical website
 https://nodejs.org/

2. download nyo yung v24.15.0 LTS

3. sa navbar punta kayo sa donwload

4. choose window installer (msi)

5. after mainstall wala na kayo ibang gagawin next lang nang next tapos finish

6. restart yung vscode or close lang tapos open ulit

7. sa terminal ng vscode type ninyo:
 node -v
 tapos enter 
 npm -v
 pag may nakita na kayong version na lumabas okay na yon



 
 IN ORDER FOR THE API TO WORK
 - gagawa kayo ng sarili ninyo API key don sa website ng openweather app. https://openweathermap.org/
 - mag gawa muna kayo ng account, tapos may mag eemail sa inyo confirm nyo may ibibigay silang instructions, after confirmation nandon na yung default api key.
 - if want nyo mag pagenarate ng bago punta kayo sa profile nyo tapos MY API keys.
 - wait nyo lang ng few minutes para maging active yung key

 TO CHECK IF YOUR API KEY IS ALREADY ACTIVE:
 https://api.openweathermap.org/data/2.5/weather?q=Manila&appid=YOUR_API_KEY
 - change nyo yung YOUR_API_KEY ng mismong key ninyo.
 - pag ang result ay naka json na active na yon.

 1. inside ng weather-app folder, add kayo ng files
    .env at .gitignore

 2. ang laman ng .env ay 
    OPENWEATHER_API_KEY=their_own_key_here
    - don nyo ilalagay sa their_own_key_here yung nagenarate ninyong API key or yung default
 
 3. Sa .gitignore naman ay
    node_modules
    .env

    NOTE: Kaya may gitignore ay para hindi mapush yung api key ng open weather publicly sa github. Baka mapagbayad pa tayo ng milyon HAHAHA
          Try ninyo kung gagana yung API sa inyo pag pinalitan lang yung Api key don sa .env