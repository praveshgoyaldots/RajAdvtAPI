using CMOWebApi.Models.LoginModel;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.ServiceHelper
{
    public class TokenValidationHandler : DelegatingHandler
    {
        private readonly static string apllicationUrl = ConfigurationManager.AppSettings["ApplicationUrl"];
        private readonly static string apiUrl = ConfigurationManager.AppSettings["BaseUrl"];
        private readonly static string tokanPrifix = "AuthCMO ";
        private static bool TryRetrieveToken(HttpRequestMessage request, out string token)
        {
            token = null;
            IEnumerable<string> authzHeaders;
            if (!request.Headers.TryGetValues("Authorization", out authzHeaders) || authzHeaders.Count() > 1)
            {
                return false;
            }
            var bearerToken = authzHeaders.ElementAt(0);
            if (bearerToken.StartsWith(tokanPrifix))
            {
                token = bearerToken.StartsWith(tokanPrifix) ? bearerToken.Substring(tokanPrifix.Length) : bearerToken;
                return true;
            }
            else
            {
                return false;
            }

        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            HttpStatusCode statusCode;
            string token;
            //determine whether a jwt exists or not
            if (!TryRetrieveToken(request, out token))
            {
                statusCode = HttpStatusCode.Unauthorized;
                //allow requests with no token - whether a action method needs an authentication can be set with the claimsauthorization attribute
                return base.SendAsync(request, cancellationToken);
            }

            try
            {
                const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
                // var now = DateTime.UtcNow;
                var securityKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
                SecurityToken securityToken;
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                TokenValidationParameters validationParameters = new TokenValidationParameters()
                {
                    ValidAudience = apllicationUrl,
                    ValidIssuer = apiUrl,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    LifetimeValidator = this.LifetimeValidator,
                    IssuerSigningKey = securityKey
                };
                //extract and assign the user of the jwt
                Thread.CurrentPrincipal = handler.ValidateToken(token, validationParameters, out securityToken);
                HttpContext.Current.User = handler.ValidateToken(token, validationParameters, out securityToken);
                //added by sandeep
                SetUserValue(request);
                return base.SendAsync(request, cancellationToken);

            }
            catch (SecurityTokenValidationException e)
            {
                statusCode = HttpStatusCode.Unauthorized;
            }
            catch (Exception ex)
            {
                statusCode = HttpStatusCode.InternalServerError;
            }
            return Task<HttpResponseMessage>.Factory.StartNew(() => new HttpResponseMessage(statusCode) { });
        }

        private bool LifetimeValidator(DateTime? notBefore, DateTime? expires, SecurityToken securityToken, TokenValidationParameters validationParameters)
        {
            if (expires != null)
            {
                if (DateTime.UtcNow < expires) return true;
            }
            return false;
        }

        public string createToken(string tokenValue)
        {
            //Set issued at date
            DateTime issuedAt = DateTime.UtcNow;
            //set the time when it expires
            DateTime expires = DateTime.UtcNow.AddDays(1);

            //http://stackoverflow.com/questions/18223868/how-to-encrypt-jwt-security-token
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            //create a identity and add claims to the user which we want to log in
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, tokenValue)
            });

            const string sec = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";
            // var now = DateTime.UtcNow;
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(sec));
            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);


            //create the jwt
            JwtSecurityToken token = (JwtSecurityToken)tokenHandler.CreateJwtSecurityToken(issuer: apiUrl, audience: apllicationUrl, subject: claimsIdentity, notBefore: issuedAt, expires: expires, signingCredentials: signingCredentials);
            string tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }
        public void SetUserValue(HttpRequestMessage request)
        {
            try
            {
                IEnumerable<string> UserIdHeader, UserTypeHeader, UserNameHeader, SSOIDHeader, FileSizeHeader;
                if (request.Headers.TryGetValues("UserId", out UserIdHeader))
                {
                    CurruntUserViewModel.UserId = Convert.ToInt32(UserIdHeader.First().ToString());
                }
                if (request.Headers.TryGetValues("UserType", out UserTypeHeader))
                {
                    CurruntUserViewModel.UserType = UserTypeHeader.First().ToString();
                }

                if (request.Headers.TryGetValues("UserName", out UserNameHeader))
                {
                    CurruntUserViewModel.UserName = UserNameHeader.First().ToString();
                }
                if (request.Headers.TryGetValues("SSOID", out SSOIDHeader))
                {
                    CurruntUserViewModel.SSOID = SSOIDHeader.First().ToString();
                }
                if (request.Headers.TryGetValues("FileSize", out FileSizeHeader))
                {
                    CurruntUserViewModel.FileSize = Convert.ToInt64(FileSizeHeader.First().ToString());
                }
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
