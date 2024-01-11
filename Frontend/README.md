# BeeDoor Arduino 
Universitatea ” Politehnica” Timișoara 
Facultatea de Automatică și Calculatoare

BeeDoor Arduino

						Autori:
							Domocoș Alexandru-George
							Popovici Crina-Ileana
Anul al III-lea, CTI-ro

Specificații proiect:

Proiectul nostru vizează implementarea unui sistem prin care un motor stepper să fie controlat prin intermediul unei aplicații mobile, luând în considerare parametri precum umiditatea și temperatura. În cadrul acestui proiect, vor fi abordate următoarele aspecte:

-	Programarea plăcuței pentru a permite comanda de deschidere în funcție de modul selectat.
-	Verificarea condițiilor de mediu și luarea deciziilor adecvate în funcție de acestea.
-	Integrarea în aplicația mobilă a opțiunilor de selecție a modurilor de cules.
-	Implementarea unei funcționalități de afișare în timp real a temperaturii și umidității

Prin realizarea acestor etape, proiectul nostru își propune să ofere o soluție completă și eficientă pentru controlul motorului stepper, prin intermediul unei aplicații mobile, adaptându-se în funcție de parametrii de mediu și permintând utilizatorului să selecteze modurile de cules potrivite.
Pe lângă funcționalitatea de bază, motorul stepper va fi configurat pentru a lua decizii autonome în funcție de anumiți parametri, cum ar fi temperatura ambientală. Astfel, acesta își va asuma rolul de autopilot, respectând criteriile și parametrii stabiliți de către dezvoltatori. Această abordare își propune să ofere un nivel suplimentar de automatizare și inteligență pentru sistemul motorului stepper, în vederea adaptării și optimizării sale în raport cu condițiile externe specifice.




Descriere

1.	 Arduino Uno
    Arduino Uno este o placă de dezvoltare open-source bazată pe un microcontroller ATmega328P. Această placă este proiectată pentru a fi ușor de utilizat și este frecvent utilizată de către pasionați și profesioniști pentru prototipuri și proiecte de mici dimensiuni.





      Arduino Uno are 14 pini digitali, care pot fi utilizați atât ca intrări, cât și ca ieșiri. Dintre aceștia, 6 pini (3, 5, 6, 9, 10, si 11) sunt pini PWM, care permit controlul nivelului de tensiune trimis către un anumit dispozitiv prin modularea duratei de timp a semnalului electric. PWM-ul poate fi folosit pentru a controla luminozitatea unui LED, viteza unui motor sau alte aplicatii ce necesita un semnal electric variabil.

    ATmega328P este un microcontroller AVR (Advanced Virtual RISC) produs de compania Microchip Technology, folosit frecvent în aplicații de electronică, precum prototipuri de Arduino, sisteme de control, robotică, senzori, și multe altele. Acesta este utilizat pe larg în placa Arduino Uno, datorită performanțelor sale și a interfeței usor de utilizat.

    ATmega328P este bazat pe arhitectura RISC (Reduced Instruction Set Computer), care utilizează un număr redus de instrucțiuni de bază, ceea ce face ca execuția acestora să fie mai rapidă și mai eficientă. Microcontroller-ul are o frecvență de operare de 16 MHz și poate fi programat prin intermediul unui port USB sau a unui programator extern.

    ATmega328P are 32 KB de memorie flash pentru stocarea programului, 2 KB de memorie SRAM pentru datele variabile, si 1 KB de memorie EEPROM pentru stocarea datelor non-volatile (care nu se pierd la oprirea alimentarii). De asemenea, acesta are si o serie de periferice hardware, precum 23 de pini I/O digitali, 6 pini PWM, 6 intrari analogice, și o serie de porturi de comunicație, cum ar fi USART, SPI și I2C.

    O caracteristică importantă a ATmega328P este capacitatea sa de a funcționa la tensiuni variabile, între 1.8V și 5.5V. Aceasta face posibila utilizarea acestuia cu o varietate de dispozitive și senzori, precum și cu baterii sau alte surse de energie portabile.

    In general, ATmega328P este un microcontroller puternic și versatil, cu multe caracteristici și functii utile. Acesta este frecvent utilizat în proiecte de electronica, datorita performanțelor sale și a interfeței ușor de utilizat.
    În proiectul de mai sus nu se utilizează interfața CAN / SPI / I2C / RS232 / USB și nici nu este necesară funcționalitatea PWM.



    Cu toate acestea, proiectul folosește următoarele:
    •	Sistemul de întreruperi - biblioteca DHT utilizează temporizatoare și intrările întreruperii hardware pentru a citi date de la senzor. În plus, senzorul DHT este conectat la pinurile digitale ale microcontroller-ului, care sunt capabile să genereze evenimente de întrerupere pentru a detecta datele senzorului.
    •	Timers - biblioteca Stepper.h folosește temporizatoare pentru a controla viteza și durata rotației motorului pas cu pas.
    Deci, în general, proiectul folosește sistemul de întreruperi și temporizatoarele pentru a efectua citiri precise de la senzorul de temperatură și umiditate și pentru a controla viteza și direcția motorului pas cu pas.

2.	 Raspberry Pi 4
    Raspberry Pi 4 Model B este o placă de dezvoltare single-board computer open-source, proiectată pentru a oferi putere și versatilitate într-un format compact. Această placă este o alegere populară atât pentru pasionați, cât și pentru profesioniști, și poate fi utilizată într-o gamă largă de aplicații, de la proiecte mici la sisteme integrate complexe.


       Raspberry Pi 4 Model B este echipat cu un procesor ARM Cortex-A72 quad-core de 64 de biți, care rulează la o frecvență de 1,5 GHz. Această putere de procesare permite rularea aplicațiilor complexe și a sistemelor de operare precum Linux. 
    Placa este disponibilă în diferite variante de memorie RAM, iar versiunea cu 4 GB de RAM oferă suficientă memorie pentru a gestiona sarcini intensive. De asemenea, placa are o gamă variată de porturi și interfețe pentru conectarea la alte dispozitive și periferice. Printre acestea se numără:

    -	Două porturi USB 3.0 și două porturi USB 2.0, care permit conectarea de dispozitive periferice, precum tastatură, mouse, cameră web sau unitate de stocare externă.
    -	Un port Gigabit Ethernet pentru conectivitate de rețea rapidă și stabilă.
    -	Conexiune Wi-Fi dual-band și Bluetooth 5.0 integrate, permițând conectarea la rețele fără fir și dispozitive compatibile cu Bluetooth.
    -	Un port HDMI pentru conectarea la un monitor sau televizor, pentru afișarea conținutului la rezoluții de până la 4K.
    -	Un conector GPIO (General Purpose Input/Output) cu 40 de pini, care permite conectarea la diverse componente și periferice externe.
    -	Un slot pentru card microSD, pentru stocarea sistemului de operare și a datelor.

      Raspberry Pi 4 Model B suportă o varietate de sisteme de operare, inclusiv Raspbian (sistem de operare optimizat pentru Raspberry Pi), Ubuntu, Windows 10 IoT Core și multe altele. Această versatilitate oferă utilizatorilor posibilitatea de a alege sistemul de operare care se potrivește cel mai bine nevoilor lor.

      O caracteristică interesantă a Raspberry Pi 4 Model B este posibilitatea de a rula aplicații și servicii în cloud. Placa poate fi configurată pentru a funcționa ca un server, gestionând servicii precum web hosting, server de fișiere sau server media.

      Cu toate aceste funcționalități și caracteristici, Raspberry Pi 4 Model B este un instrument puternic pentru dezvoltatori. Placa oferă o platformă accesibilă și ușor de utilizat pentru prototipare rapidă, dezvoltare de proiecte și învățare a programării și a conceptelor de electronică.

      Plăcuța Raspberry Pi se va folosi ca un gateway pentru a transmite și a primi informații. Datele de temperature și umiditate sunt captate de către plăcuța Arduino Uno cu ajutorul senzorului DHT11. Acestea sunt incărcate pe un server unde le vedem în timp real în aplicația noastră. Scripturile rulate apoi fac ca Arduino Uno să ruleze anumite părți din codul încărcat pe aceasta, în urma deciziilor luate sau în urma comenzilor date din aplicație.


Detalii aplicație

    Aplicația mobilă a fost concepută prin intermediul framework-ului de dezvoltare React Native. React Native este un framework JavaScript destinat dezvoltării aplicațiilor pentru sistemele de operare iOS și Android, avându-și originea în anul 2015 la inițiativa dezvoltatorilor Facebook. Un număr semnificativ de aplicații cross-platform, inclusiv Instagram, Facebook, Uber Eats, Oculus, Coinbase, și multe altele de notorietate similară, au fost create utilizând acest cadru de dezvoltare.
    Avantajul principal al utilizării React Native constă în principiul fundamental pe care a fost construit, și anume "Write once, run anywhere" (WORA), care permite dezvoltatorilor să creeze aplicații mobile utilizând aceeași bază de cod pentru diverse platforme, precum iOS și Android. Scopul acestui principiu este de a minimiza efortul și timpul necesare pentru dezvoltarea și întreținerea aplicațiilor separate pentru fiecare platformă. În locul necesității unei echipe distincte de dezvoltatori pentru fiecare platformă, cu React Native se poate apela la o singură echipă care să dezvolte și să întrețină codul pentru ambele platforme.
    Prin intermediul React Native, dezvoltatorii au posibilitatea de a scrie componentele aplicației folosind JavaScript și sintaxa React, care este un framework popular pentru dezvoltarea aplicațiilor web. Aceste componente sunt ulterior traduse în elemente native ale platformei respective, prin intermediul unui pod de legătură, care facilitează comunicarea între codul JavaScript și codul nativ.
    Abordarea "Write once, run anywhere" permite dezvoltatorilor să evite rescrierea integrală a codului pentru fiecare platformă, ceea ce conduce la economii substanțiale de timp și efort. Totuși, este esențial de menționat că, în anumite situații, poate fi necesară scrierea unor componente specifice pentru fiecare platformă, pentru a beneficia de funcționalități native avansate.
      Cu toate acestea, principiul "Write once, run anywhere" nu este absolut și există situații în care este necesară adaptarea sau personalizarea codului pentru anumite platforme. Cu toate acestea, React Native facilitează într-o mare măsură procesul de dezvoltare multiplatformă și a devenit o opțiune populară pentru crearea de aplicații mobile într-un mod eficient.




  Obiectivul aplicației create este de a prezenta pe ecranul principal datele citite de la senzorul de temperatură și umiditate și de a emite comenzi de activare și dezactivare în funcție de modul de colectare pe care utilizatorul dorește să îl selecteze.
Utilizatorul are la dispoziție două opțiuni de pornire a motorului, astfel:

  1.	Modul de colectare pentru salcâm se activează automat atunci când senzorul de temperatură indică o valoare de 25 de grade Celsius. În plus, utilizatorul are libertatea de a activa manual acest mod dacă consideră că este necesar, chiar dacă temperatura este sub 25 de grade Celsius. De exemplu, dacă temperatura curentă este de 23 de grade Celsius, dar în zilele anterioare temperatura a depășit 25 de grade Celsius, salcâmul a înflorit și, în consecință, poate fi în avantajul apicultorului să inițieze manual funcționarea motorului și în ziua în care temperatura este de 23 de grade Celsius.

  2.	Modul de colectare pentru floarea-soarelui se activează automat atunci când senzorul de temperatură atinge valoarea de 20 de grade Celsius. Similar cu modul anterior, utilizatorul are libertatea de a activa manual acest mod la floarea-soarelui dacă consideră că este necesar, chiar dacă temperatura este sub 20 de grade Celsius.	
  

  Implementarea afișării datelor de pe serverul API provenind de la senzor s-a putut realiza datorită unei conexiuni seriale stabilite între Arduino și Raspberry Pi. 
  Precizăm că utilizarea cadrului de dezvoltare Express.js a permis citirea datelor de la portul serial și afișarea lor în aplicație în următoarea manieră:
  •	S-a inițializat un server local pe Raspberry Pi 4 care a transmis datele - temperatura și umiditatea - primite de la portul serial. Aceste date au fost expediate folosind biblioteca axios. Colectarea datelor de la portul serial a fost posibilă prin intermediul bibliotecii serialport.
  •	Aplicația elaborată în React Native a apelat serverul API tocmai creat. Ca răspuns, serverul a transmis temperatura și umiditatea actualizate în timp real, acestea reflectând condițiile mediului înconjurător în care se află senzorul.
  •	În final, datele au fost primite la fel ca și mai sus, prin intermediul bibliotecii axios și astfel s-a putut realiza vizualizarea acestora pe ecranul dispozitivului mobil.

  Express.js, un cadru de dezvoltare web în JavaScript, oferă un ansamblu de funcționalități simplu și flexibil pentru dezvoltarea agilă a aplicațiilor web. Acesta se bazează pe modulul HTTP al Node.js, oferind o gestionare eficientă a rutelor și cererilor HTTP.
  Express.js permite dezvoltatorilor să creeze servere web scalabile, având în dotare un sistem de rutare flexibil și suport pentru middleware-uri. Acest cadru de dezvoltare este apreciat în comunitatea dezvoltatorilor JavaScript și este deseori utilizat în combinație cu alte tehnologii pentru construirea aplicațiilor web de mare complexitate.
Transmiterea comenzilor de la aplicație către Arduino s-a efectuat astfel:
  •	Considerând faptul că placa Arduino este conectată la Raspberry Pi, s-a efectuat un POST request la același server de unde s-au obținut valorile anterioare pentru temperatura și umiditatea, dar către un alt endpoint din aceeași adresă HTTP. În acest mod, comanda din aplicație este transmisă în funcție de butonul selectat.
  •	Ulterior, comanda este trimisă plăcii Arduino prin portul serial folosind codul arduinoSerial.write(command). Comanda este fie "START", fie "STOP", în funcție de modul de colectare selectat.




Bibliografie:

•	https://components101.com/sensors/dht11-temperature-sensor#:~:text=use%20DHT11%20Sensors-,The%20DHT11%20is%20a%20commonly%20used%20Temperature%20and%20humidity%20sensor,to%20interface%20with%20other%20microcontrollers
•	https://docs.arduino.cc/hardware/uno-rev3
•	https://www.raspberrypi.com/documentation/
•	https://cdn-learn.adafruit.com/downloads/pdf/all-about-stepper-motors.pdf
•	https://reactnative.dev/
•	https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-express-js#:~:text=Express%20is%20a%20node%20js,helps%20manage%20servers%20and%20routes.


