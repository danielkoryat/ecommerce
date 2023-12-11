import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const HomePage = () => {
  return (
    <div>
      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      dynamicHeight={false} // Since we're using Tailwind, we can control height with classes
      className="carousel" // This is where you can add additional Tailwind classes if needed
    >
      <div className="h-64 relative"> {/* Tailwind classes to control height */}
        <img
          className="w-full h-full object-cover absolute" // Tailwind classes for full width, controlled height and cover fit
          src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww"
          alt="Featured Product 1"
        />
        <p className="absolute bottom-0 bg-opacity-50 bg-black text-white w-full text-center py-2">Featured Product 1</p>
      </div>
      {/* ... other slides */}
    </Carousel>

      {/* Welcome section */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Welcome to Our E-commerce Store
        </h2>
        <p className="text-gray-600 mt-4">
          Find the best products at unbeatable prices.
        </p>
      </section>

      {/* Categories section */}
      <section className="container mx-auto py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800">
          Shop by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {/* TODO: Replace with actual categories and links */}
          <CategoryCard
            title="Electronics"
            imageUrl="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgVFRQYGBgYGhgcGBkZGhgbGBsYGhoaGhgbGhgbIS0kHB0qIhgaJTclKi4xNDQ0GyM6PzoyPi0zNDEBCwsLEA8QHxISHTMrIyszMzM2MzMzMzMzMzUzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//AABEIAMABBgMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQMEBQYHAgj/xABBEAACAQIDBQYCBwcDBAMBAAABAhEAAwQSIQUxQVFhBhMiMnGBkaEHFEJSsdHwI1RicpKiwRaCwjOy4fEVRFND/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAEDAgQF/8QAJhEAAwEAAgICAQQDAQAAAAAAAAECEQMhEjFBUSITMmFxUoGRBP/aAAwDAQACEQMRAD8AodxXuObt5y9xiWZm11OunIcgNBSL28xOUjTSOUU6dta4e0DruPMaGmIjHQhgHEgkDqOoNTdnYGdcszIJUjjET76r7MvOmly0Y1MxuMa/l8qtHZtw1sA71hvZbiI/9t4/0ryoAz7GYJrblGGo+BHMVIdntovauLvIJAIWc3RhHEfh6Crp2z2MCWyjxKodeZ++o9o94qO7A7PF26QdywRoJzNxk8gpI9a1K7RimvF6adsy2t+2rvbE6gyN5HEfrfNPxsy1MlFJ5kAmnVlAqgAQAIA5ClQK6Tiw4s2VXcAPSlaAoMwAkmKyNAoRXaKDvp2o00gfM/CpVyJei08Lfvog8fYJGorOu0vZw5+/JyIFbOxBMQCwMAbgVB933mFOrXrZJ85I+6Qo9xAmofbGyjdUqYI4g7j69evCmn5IVT4PTEUABOU5QToRos7wOEc1Omh3yDU3sftPew5e21oXUfzoZZTPHLvU+wnkd9dbZ7LX7DFraEod6kSI36Ebv1uqFLMPCCo/geVg9G8re4B9ay5aKq1SJq72zvgm3azKjbk7xS6dEZizR0qNbEyS7I4zEFR4ZJnfJJLNroSIHAA11YZyMgsglhHldj7Kcq+8GpPZ/Z5UH7dktBtFQHPfbpbtJ4iTukj1pZoakd2LaW7du2V/aXXQkLLtbtAgxA3u0bgNBGgnXSbeFuYor3ts2sMhBWy0Z7hXy94BoqCB4OPHlTTsrsAW279rYQ5ctpDBdEOrNcYb7jaSBooAA41a62lhOq0OhRAVWO1Pa+3hJVVzuAOMICdwJ3zGsUzJaKpXaXtsLNwWrIDFD+0Y6rpvQdeZ9hVawvbDHYp/AwtqN5ABHoJ1NIY/CLae2hCObuaRlIYARmYkGN5HvPKsOisw/bRYb/0iMkucOO7Ef/08cnpEb+FS+w+3OGxEAnu2454yz1P2ffTrVHxPZ+04jvHWNYK6TBHm/wDFM8Nsz6vnMF54rBMDh+PKl5MfgjbVMiRqDujd7GuDeXdmHxrPNiYrEWrQu2WDIRm7stmUrzHI+lWDZG2beJlR4Xknu2IB3ySv3vx6U1SZmoaLPRzRUdbMAoUKFABEUKOhQI82Y+1c/wCoqym6QYM8TyjhrypCxiwdDw3g6N8Nze3wpHB7WYKEckgaA9ORHGlWAYhokb9FMzw4VE6x05nQU8wOO7ohQd4VT/KXV294Qf01EXsXl0C69d/w30hhA9x9NTxPL9afIUGWaJidpd8+bhlA/q/9freF+wNkJiryDcGMe6kn8ah8AAgk7kGZvaIE9TA9TuG+p76OLRd3uncxJB6eVPkD8KpK7RG30zQgK6Brma5ZqscwoWqIxGKm5mPlBKoDukaM34ieXrq+7yTA9zyqFuXc92V1VDC8idJb8vSo8j+Do4Z71liw10nh+fw5etOu8AGpA/XwqFbFOF8Kkn4SfWoi7hcVdM3Lotp923ofQ3Dr/SFqPidPki2PtG2OJNGrhxIqH2fgVAAE5RzJJPuamlAAirRGdnPycipYcMgO+muJ2Zafz21PqBStzE/tBb3EiQeEzu+VLXsP3iFZZSRIIMEEHnzBinXJ4vDM8TpaRD9msMwg2kI6oh/EU7wOx7Nr/pW0TnkRVn1yipDDksisfNub+YGG9pFdkU5rVoVPi8OQKE0DSTtTM6NdrbSWzbe4QWygwo8zN9lR1JrCu0+PuXbxLmSTqeBY746DcOgrVe1OK/Zsvp8iD/iss21ZkhhStdD46/ItOxLC2rSyQNJYn0kk9ANaYYbFd5dfEvooGVJ4Iu73JJPq1RKYt74FpQQNA56DgPXj6dalUA7+3a+yitccc8sBR8TPtUDrJRJaC+bUAhBAaDOtxj5eGm/Q79we2cOWEi0hiZHeXZgAnfl14j4dKOxh/Bnc6tJYQZDEEpPIQBFLPiQoWCSwQDQ+ATE6A740j330hkchILdyzW31ZkaCGG4sADD+o8W6eVRokGDowgyOfAg1JYvMwzSc6+JGMk5gOfIjQ9DTDH3AUNxeAVwP4WiR+uVNCZdOx/aC5cfuLrZmylkY+YhYkHmYMz0NXECsz+juz3uIa+PLbQqG4F3jQeijX+cVoNzAWyZjK33lJVv6hrVZ1ohaSY6J6H+lvyoxTP6meFy6P97H8ZrpcO3G67DkSv4gA08ZnZ/kdUKbtZJ+2w9DFCmZPPmP2Olwll8LfI+oppgsOqtldZiRlD5PFHhzE+VZIk8ql7F6dNx5V3iMCtzzLJG5how9CKHCfaHPI56ZFf8AxAzMMwygkSkQ0cQx9N8GpPC4NUWRlVBvdjC7uLHefiddAKSs7JuAwl24PZWPxIqZwPZIXCGuvcufztp8B+dJQ/odckv5Iy3mxTizZDd3IzvEFyNwA99BwmtZ2Fs4WLSoAJ0mPSAPQfnTbY2ybdoAIoECNw3dOVTQ0qkzhKr0NjTd2JMDea6uvR4BZlvYe2+i6xaET5VgltG+tm03EwdOLGP1+hVNwwvd6LluBnEFCSwhRoTrpqTEcutXLE2u8eTuXd/k/rlXaYYcqURi1+x8ltvJ9IjsOl4+ZlX+Rf8ALE0+sYMbzJPMmT/4p0lulgK30vRPt+2BFiubt6KNmqOxr6GjB+hrisWC8g6pr8DVhw94MoccdY6gaj3HzFZ9evZboJ8plW9Dp+MH2q0dnsUchQ71Jj1H56fGufmnHp0/+e9WD25ch3UMRJzDXTloPYfGpCm7XIK+pX2IzL+Ee1HhruYH+FmU/iPkRS438G+VdaKNTa+dKctTW/VkcrKl2ktlkIrNdp3mRAjatmMc8gHH3Me1attdRlJO4AzWaWcL9YuPICkiVViAcg0nU7hvPKaVvEa4p2hLspix3ht5dXICMfLnIMKTwnKY6irFZwYt4rvLjee29uIBCkEyZB1K7zpEEayQDFPsj6vbdsylbiSSGAzCCCm+YaZV11BGukioXE7de6vduz2yhGRyfE2WIF4rAY6eaPXnUDs9GhJjGZBwYFlcrpLbiNNSuk686RIqsbL2zJi44S5pIYeBwBp67jDDXXjpU39eMbk9e80/7Z+VZGL4l8qE8dw6k6AVEYvMbZt2xmchLSAfaeAo+Z+RoX8dnbKhDuPuzkt8z1b58hVn7DbKD3O+OqWiVQn7V0j9o/XKDE82atxOsnyViLT2T2QuEsiwuuRVzt952lnPxI9gKnab4TcTzJP5fKKXqiIANEDR0KYgUKKhQBlmAu4LaAm2wS7ElTCuPVdzjqJ9RTobDa35xK/fHl9/u++nU1ittypDKSCDIIJBB5gjdV97NfSVeswmJU3k3ZxAuge+j+8HrU5tyXvjmjQMNs5RwqVw+GA4UjsbH4XFpnwl1T95N0fzWzBT1Gh361IjQwwynhxU+jf4MHpVp5EzlviqTtBFG5o6Tc1swM8bdgVIbKH7JTzE/Ek1A7VeAamOzl3PhkPIEH2JH+Knyel/ZThf5P8Aodold5a7iiremAoojQoGgYk5qPxQ0qQuU0vJTQmVXadnfTvYeMkT9tCM3XgD7gfKneLw01BnButwFCQenKnU+SwzFuK0umGvi44XkCfQKYX/ALz8KfYa2FDHi7Zj6wFHyUVGbCw5XMx1lVB5zLE/iKlwa54nGzru/JIDU1vmnDGmmJeBVUQZSu3O0Bbt5ASGflwVSMxPTUD3qg7K2gGuFWBBLZw8tOcwFXQblE6k5YzaGrH20DXHeNdEA6oCS0D+b8KpjDIRGhH4/wDipX7L8WJFnZ7T3HCr4FJCAk5QSSXA18Ikxy0qK2hs5bm8ZW4VI7DxVtEYNPl00UieTSZ15iY40/sWbVxYnKxkjio5COHtUi5RrmDuWyEIV1JgBvLPrw9jSouW7Zy3LDDlFyVPtFWbH7NYDK4lTuI3eobnSGGwNqNxY821PpyoAaYLFvfuJhsNbCF2CiNY5sTyAk+1bhszApYspbQeFFAHMxvJ6kyfeqd9Huxkl8XlADTbs6R4AfHcH8zCB0XrVtvYho3/AGlB03DOBvqs9I57/KsJGwsADoKVrmIPvXVaRlgoUVcXbgUSaYg7lxRvMUdVzaGNLHQTqQBod3mOvUx7daKs/wCjWfyeb6Oio6idIthMXctOLlt2R13MhKsPcVpfZn6U3EWsbbzgwO9RRm1geO3ub1WPQ1mdjDu7BVUkmY6wCW1OkAAz6VYNkqLSJcZWa2wzuzEBUZSVUIsTnII4wwYjhIAN3wGKtX07zD3EdOjSAeXND0Pwrt+R0PI8fTn7V5zwu17li73mFZrBGnhZiDE+YNMj+EyK0vs59Kdu4Bax1sKf/wBUBKHq6aleGon2qk8jRO+Ka9dFp2okg0j2Mx4W49hzvOZP+Q+QPxqXOHS8gey6urCVIYMCOjjf7/GqdtfC3LVwXFBVlMjnpx61bZucObxrjrWaQywYojUZ2e25bxVveBcXzL15jmDUqy1ma+H7HU52vRxXJrsiiitGBNhSLpTkiuCtMBjct0we2AZqYuLUa6F3Cjjv9KemGteIldnrCT94/wCAP8U6NcKoACjcKNjUp+/svb+Po4c1GY99DUhcNR2LWRVETZmm3VYXCQYJ0mqxibRnXQ/rdWk7U2eGnSqhtHZjLOkjlSudNReFeF0rpT3DY8jjTK/aI0+R/wAGkUU8PhUHOHTN6XDA7X0gmQd4P5V3ew9q5orG2pK5yNYQsFbIJ3kNAjnVRS8Rv0q7fR/sh8TfF64P2FhgVnc94eX1Ceb1y9aSWs1VJLTVsLh1tqqIoVUAVQNwUCAPlXVzCowIgSePWlFFRWKtXRcICI6OQSGPlIjgQQR4Qehqr34Oac3sl7+8g0dtpGu8aH15+++muKv93bLtJyiTAkxxgUnh8cjP4CGzATBkAc6T6w2u9HxNQO2sdGnIEn/FTF94BqibUxYY3GJ0GYSOQBH+KokRplk2TZ8MjXQD5Bifi1Cq1b7R3rGFshLSs5VQ+a4EAZVyXFzwQWDINOvQ0Kn5Is4bMNp3gdnvcOgYL4vFlYiVUtlEb2MQB1p/sLBqWL3B5QrKCYDDMR4gVI7snQv9nQ9ae47aK2lNsJlbXKgLK1qQGCsYhgGOcFWBJUTyqJ0nVzEW7Vlclx+7ZjkyiHzBSGbxHxKZIYQACRE61Xb+JZwgMQihVAEAASfcySZ60ndcsxY6liSTzJ1O6uaBAo6KjpgSmxNv4jBvnsXWST4l3o38yHQ+u/kRWo7D+kbDYlRbxiLac6Z99pjzzb099P4qxqhQI3THdm3RhfwVyDvABEEHk24g9am9i9ps6lMUvdOpglpCndrJ0Ekxv99RWS9ktv8A1O13n1lyCzKcPEoGhiJBkidDmXLJ0O4kXvYXaHC7Wm09krdVSxQjMMoIBZLgGm8aGDrxrXlvsz4Jev8AnwaCqSJBBHSuCtUe7s3FYLx4a6zWxvR9YHQcvSKkcL2vcAC7Z9Sp/wCJ/OqT5Z12c9+KePplmy0RWolO1OHO8Ovqp/xNdHtJZPlDsein/lFa1/TM+M/5IfXV4CubVsJ1c/KmqY57nlXIOZ1b8h86eWLcetDTfv0CqZ9dv7OTionwneRvG8b6cmm7YXU+Lfv0HrTg0xMScU0vJT0ikmSmIhsRYmorF4EEVK4zaKKxRRnYaGNFU8i3PoAY4xUUFzszXUV5IygMfABqMoIHi4lpn8KzXIpNRxVRWtp7EBnSoC3sC49zIoniTIGVZgmT6j41oqWPEiq2ZHkANJZWCkwCdSPCfNqI4zpI4bZIBDDQ+kz60Jqlo2nNYyE2Z2KwzKC4duYJEdeG6rvgcKltFt20VEUQqqIAHpSWGs5REzvM+tPEowWigoVyDRzSANhSNuyiTlUCd8AClZrljTBjPH3IRiOAJ+FUuwQiuC0kZhcBBAaSQACd0jUHU7+FW3bd/JZduSncYOm4gwYPqKzxbxYyfQDkOAk6mN2tP2L0WjZWzLOJtBLmYqrM0EgtMwCTGuhPxoqgtkbUNp72ugZABMRKZjQqLR1xX4mdY3bRHhXK5UuFuMNcrrBgCBmglSdVMAxOpgaFCpmwUdCioAOhQoUwDoUKAoEGBW9/Rb2c+rYXvXWLuIh2neqfYXpocx6tHCsv+jvs59cxah1m1ah7vIgHwof5iPgGr0K7BQSdABJ6AUMEMtojMBbHGC3RVM/MgD0zcqjX2cp4VI2wTLMIZtSOQ+yvsPnPOu4rp414o4+WvKiG/wDh05U5sbOVeFLbTxyWLT3bnlRSTG8xuAHM7qyrB/Slie9LPaU2idEUQyr0Y7z8BTrkz2KOF16NetWgKcCoTs/2mw2MWbVwZvtI2jj2NTVLdBy56Z1RGhRE0AcsYqm9re1ItkWLTDvHIUt9wHT40n217XLYVrVsgvuJH2eg6/hWTJfuPc7wnUGZPOsXWdI3xxvbNFxuNFlEACw0+NphQvDNPnaZ1/iOsVzhsffa6AUItsFYBhAy5AxIaPE8yIG70FNsLcuPbW5IW2cpY5spIUyVncJyxJI38yK7xBV7he3cyIwykMCTkBYjIwbQ+Jt/Mfd1gdZM4bFm3dRlTPIZSuaDuBzLOhaFI13jjVswOKt3RKHd5lIhlPJlOorOrO0A1+RuWf6iIG7jlzE+o51N28V4g4MMNzDf6dR0OlUi/Honycfl2XZVrsVB4Tb6zFwZf41nL7jevzHWpxGBEggg7iN3xqqafo5nLn2HNHTJdp2S+QXELHcJ0OpEBtxMg6AzTuaA7R0K4uN0H6/GgTSb08DeiK26M1m4OJVvwrPsG0gHmK0bHpKMOh4afHdWT443LOdFgiTB1kA8iKZnHvZG7Wxjwwtglnus3+1FFufQkT70KbNeLGZIIAXwkAhRuGoOnzoVBpnSnOFaoUKFTLAoUKFAAp3axQFtrbBmElkAbKquYBdgBLGAAJOmvOmlHTAAo1FCr39FPZ36xiu+uLNrDkNrua7vReseY+i86ANQ+j/s99Swaow/av47p5ORov8AtEL6yeNTmKfMwTgIZ/8AgvxE+w50o+IUJ3gIZYkFSDmny5TxkkAetN7SkDXzEyx6nl0GgHQCt8c69Jct4sO6OiUVD9rtsDB4V7pgtACCRqzaKP1wq7eHMk36M8+lTtKWuLhbbHKmt0qYJY7lB4QNd3FeVZ2bgkwMonQb46TRYi8zuzuczMSzE8WJkmk65qevTsifFYL2sQyMHRirDcQSCPQitB7M/ShctwmLU3F3C4vnA/iH2vUfCs3rk0k2vQ6Sfs9PbL2paxFsXLNwOh4jh0I4Gm3aPaBs4e5cXzKjlfUKYqg/Qzs64BexBJFtgERdYZgQWaOkKJ9eVXrtDhTctso4iumNaOO0prEYVka4xe4SSdYNWDDYW3Zy3LrAnKGRFPOcpmfFunloZMESMV2fuq0IvHcZ09+NPML2ZeAbhJI3DWBxjXdqTu51PwrS36spEHcx9yRlOQMygKPKJhRpxgfrWprZeP7x2hu7RCVUKFzNl0LMzA8QdKSx+y10BWImCN+vXnoKg+6vWyQELAkkETx37v8ANK+No1HKqJrb2IQOGUxrqV8Ou8Npx3yeNLYLa0aHfUG+HuaNcU5ddBBbXSeXtp6inuFdbhW5edjPgQIBnuFd5AgQBuk/lU2s9lE0/RZbG0Qyhhx3RqZmANOPTrUhZvuEZe8KKw8SKd3vwPp8eNQtjCW0cOudND4XVS0nQOGUwYBbT+Knth7jWgLlsIQjBTmBNwgeZWzSQIMz94cjCTG0n7HGK2guUIyrlgQoAjKNNBJkDpqKsvY/FNcw5LMzBbjKrMZzIApEHkMxXWfLWZX8ddcgXlI7pQFGUhVnQFjwkD0rQ/o+xGfCFYA7u466cc2W5/zPwqkLsly/tLRSdzlzpUVxZEkt8KpVeKIcceVYNtqYu3YsvcueRELN1jcoHEkwAOoqi7LxWG2lbd1ttYdIz5tbYLTEPxGh5HpTT6W9uFnTA25MFXuhdSXP/TSOeuaOqV3jMKMFg7eCEZ3i5iSOLncs8hA9kXnUFTXZ11KaxjXHdkSraiORG4+lCk8Bt3EWRlRxl4K4DqP5Z3exihW/1X9Ev0V9lE252fxGEfJftsknwtvRv5WGh9N/SouvSL4xHU28VbUq2hJGa23qD5f1rVP299F9tpu4JlUkGLbnNb14q2pHHQyPSs1Ln2Um5r0Y9Qp9tbZd3D3Dbu23tkEwHG8cwRow6gmmVI0FRihQoAUw9lrjqiKWd2Cqo3lmMKB6k16U7K7DXBYVLCwWAl2H2rjas3x0HQCs0+h/s5nuNjbi+G2SlqeLkeJv9oMerHlWvYm7kWQJYwFHNjoB6c+gNADa++Z8v2U39XI0HsDPqw5Uoo57q5s2coAJneSdxLEyxPUkkxXRf9cOVdErFiOK3r1hzEyOA0/GsO+kztD9ZxPdIf2dglRG4v8AaPt5f6q0ft/2g+p4Vip/aXPDb6EjVv8AaNfWBxrBBWLfwV4Z38g6FHRVI6Aqc7MwD37tuynmdgo6TvY9AJPtTZjWsfRL2cyocZcGrytoH7oOre5HyBrUzrM3XitNC2Ts9MPZSyghUUKOvMnqTJ96cus11QroOIZvhV5U0xGHHKpRxSL25rRllUx+zQ/CmR2TA3VcHw9N7mHpiwz/AGjgioYDiCKqoc2rihtMq5U5akkR6z8q1LH7NNyQNOp3DQxPIab6hX2NbVGZwSQGVmGhSZVisgFW8pGsmToN4lyTpbivxItL8rLBndM2dFg5ZVgraHUA5ZAOms8qQubZhMq21dyihbpgm2ZlgJE6c+pGoANR+0cSWOQyQrNqSSSTAJ18ohR4RA37zUHicSytANQzDqT0l7WJe2j2gw7tyGYR4pGUQsaa5QOnCtf7F7NaxhEVxDuTccci4EL6hQoPUGs8+j3ZJvXhcuKCqeI+v2Rrz/AVsK1SJzsjy3v4nN0/Z5/hxpdEgUjYEkt8P8frrTisclaynFHjJScX2Ow9nFttF7jkIXuNbeGBufYKsdYB3KZ1ywQBFUzH4xrtx7j+ZySenIDoBA9qtf0h7XErh11ClXuAGJ4qk8NNfdeVUm8VLysagEhQwVSSfCM2pgRrzmpsoSmwtjvimZUgZRJJ3bwAJ57/AIUdaD2W2X9XsKD4WfxOeMncvsPnNCjBji7Z4Eb6aLh3tGbTZeaHVD7cPan7PPpXMV2/HZ53p6hlimw+JTucXaXXg+qzzR96n4Gs/wC030Vus3ME+dd/dOQHH8j7m9Gj1NaVdsqwggGmyLdtf9Nsy/cbUf7TvX8OlSrj+i0c7XVHnXFYV7TlLiMjr5lcFWHsaV2Xs98Ret2bYlrjBV5Cd5PQCSegr0BtHBYPHL3WItDOPLm8Lr/I419p9RTDsj2Ct4G/cvC4bkqFtZlAZFOryRoxMKJAGk86k010zolqlqLNsXZlvDWEsWx4UUKOZO9mPUkknqa7eGeZkJIXlm3MeseXmPFSmJulQAPMxhenM+wk/wDukeAA3CtxO9k+W8WHTt+udcOwAJO4UKo30obf7mwLFsw94EGN62x5j7zl9zyqz6RzJOnhnXbjbxxmKZwf2aSlscMoOrf7jr6AVXRR0K5m9Z3SsWIFChRGkMlezOxmxeJSyswxl2H2UXzH/A6kV6Mw1hbaLbQBURQqgbgAIAqlfRf2e+r4fv3EXL4B13rb+yOkzmPqOVXmrxOI5OW9YKFAU3x1/IpPwqhIYbQvNcdbSHUnX9fOm5N2ydfEvxX48Kc7OwAdS7zLHwkEhhG8gjjNdXu8BNtvGilWcqAHjeFI3HcDpwrmq23p2zxpTjFMNtBLmnlbkf8ABpw1mai8Xhbbp3lthMgZVmCSdBB1VulcW8XdseG4uZeE669G5fGtTyfZOuFfA+u2AAdxBHx6dR+H4w21MLmUkjcNOg5SamcNjbdzcYbiDof/ADXd/CyCKvLXs56TXRiGPBFx54MfxJFRGHt95c6Tr6VpW3Oy5ZiVB15b6W7J9h1tuLlwloMhSABI3Tz9KlUPS88s+P8AJZeyGyhYw6iIZ/G/qRoPYQPjU9c4Lz3+lGgioDbOMvWrouWxmSIZOB36/P5Vtp50SVLy2iyqIFNdq49bFp7r7kEgczuVR6kgUz2V2gtXoWcj8VbT4VVfpKxlzMlrKwtjxF4OV3MgAHd4ROn8XSuZpr2dipNainYrEtcdrjmWclmPUmT7VPdiNk99fDsJS3DHkW+yPjr7VWFkkAak6Ctk7N7LGGw6oR4z4n/nPD23e1ZGiSuNQpuSSTBK/CD8aFMYiprqoJO1OD/eU+f5UoO1WC/eU+f5V2ajz/F/RM0IqG/1Tgv3lPn+VH/qnBfvKfP8qNQeNfRJ38MriGANMkxF62CEcuATo5Gi7gA0Ek+vKkf9VYL95t/3flXJ7TYHjft/P8qVY+mOVUvUicBJOZt8QANwG8x66T6Cuqhf9V4L95t/3flR/wCq8D+8p/d+VCxdIGqb1k3NZX9JHZ+9dvd/bBeFCleMAkgrz8x0q8/6rwP7yn935Ulc7S4FhBxFs/H8qTxrGOfKXqRgLoQSCCCN4OhB6iirWO0GH2ZiBPf2w/BxIYe8ajoZrOtpbK7tot3EuqdxQ6/7lO751Gow6ovy+Bpgras4V8xkHKFIDM/2RLAgCeMVOdjuzpxOMFp4KWmzXSNVIUwFB4hiI9JqAOHf7p+Va32ExeBweGVWxFsXX8dzfoxGi7tyiB6zzoidfYXTU9GgKIEDhRg1B/6swP71b/u/KjHazA/vSf3flV9RyeL+idmofEt3twJOg3+2pjrFNcV2tweU5cQhJ9fypvg9v4DKe8xFuTrrmkRugxoePwqfJXWIrxR3rLEuFjxWmyTw3o3qvA9RSWGvrbYpcOVyS0mMrEkgENw5QY41EDtZhbe7Fo68iTnHo0Q3vr1oYftNgTLPircuZZTJ8I0Vd3CoYzpJP6sLtw3B4dQEZYDQp1c6eLXhypLFXHUNaZQwgFnRdApbVmSNG9KjF7T4VHbusVbCCIVyxUk6tlMSo+U13gO1WC1L4hAxYs05hJHlykCCoFGAL4vZaZDctOIEkayCB91hx6Ulh9qXLULdUkddGjoeNNb+3sC9xyMSiDwgROVmGuZ0iCOFC72rwhV0uXEctJDKWKEkQCJ1T0+daTa9CqVXssmFxFq6JUgniDvHtTtUiqBiNo4RfFaxiZl6sCTxKmPlT3AdurQ8Ny4rD7wnN7iNarN77Oe+HP2lzpvesht4qMHa7An/AO0n935UR7W4H96T+78q3qJeL+hDaGwUfUCDwI31HjFX7INu4gv2joVcSY999Sh7WYH96T5/lSN3tLgG34m38/ypty+mEq5eoZbF2NgXxCXrTlcpnuW1Af7JUnWAdY1q34p9I14bjBn1qg4/FYFjmTFIrcCCQfwosF20Fs5LlxLqfeBOYe8frpUK487TOiOVvqlhfATG6T00MddaFV1+1mCcA/WAOhkEeuhoVjC2mN1P4HszcdUe5ct21u27rpmdQ0JbuOrsv2bc24LcAd26oCpuz2lupY+roltUyuraOS2e29tmhnKq0XXMqBJiZAitmQrvZi+rKrd2My3XDZxkKWkS475xplyXUYHjPCKksf2JdGK28RZdu+vJGdVIW0iuzvqcpAJLL9kBd+amFztTea2bbJaP7NrSvlfOiPaSzcCEPEsltNSDqJEbqVXthfFzvO7s5s73JCOpzvbFu6QVcEZ1AJjiARFHYBL2PxJbJ+yBlgs3F8aqi3GuJGrWwjoSf4gInSuj2TuG2jrew7Zu/L/tVCW0stlL551Sd54FlHGkLvaa69xLjpbYo1xkB70Qbi21Y5xcDyBbWDmnUzM0ntDtFdvkG6ltouO/kYSHIL22hhmtsVBIOunmo7AU2L2de+bLNctpbvOEWbid6y5xbd0tkywDGPY6RUfj9nPZOW4UD+HMgaXTMCwDr9lgIkbxmE9Je52xvs6O1rDs9tw1tjbbMgDK+RPHosqBPmgkZtah9o457zh3yl8qqzgEM5UQHcz4niAW0mBOskgDShQoUAChQoUAChQoUAChQoUAChQoUAChQoUAChQoUAChQoUAChQoUAChQoUAPreFtFQTfCkjVe7fQ8p3H1rm5h7YiLsyzA+A6AMQrb+IAPvTe3cK7gpnmoPwkaV39aPJeP2Rx3+lABi1b/8A0/tPvRXbaAStzMeUEaa6z8PjQOKbkn9K1w90kRCj0AHz30AJ0KFCgD//2Q=="
          />
          <CategoryCard title="Fashion" imageUrl="data:image/jpeg;base64,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" />
          <CategoryCard
            title="Home & Garden"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEM8oHy-0gFKhYuYxK4tRf20-RryVPdquWOA&usqp=CAU"
          />
          {/* Add more categories as needed */}
        </div>
      </section>

      {/* Features section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TODO: Replace with actual features */}
          <FeatureCard
            icon="🚚"
            title="Free Shipping"
            description="On orders over $50"
          />
          <FeatureCard
            icon="🔒"
            title="Secure Payment"
            description="100% secure payment"
          />
          <FeatureCard
            icon="🔄"
            title="Easy Returns"
            description="30-day return policy"
          />
        </div>
      </section>      
    </div>
  );
};

// CategoryCard component placeholder
const CategoryCard = ({ title, imageUrl }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src={imageUrl} alt={title} />
    <div className="px-6 py-4">
      <div className="font-bold text xl text-center">{title}</div>
    </div>
  </div>
);

// FeatureCard component placeholder
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-4">
    <span className="text-6xl">{icon}</span>
    <h4 className="text-xl font-bold mt-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;