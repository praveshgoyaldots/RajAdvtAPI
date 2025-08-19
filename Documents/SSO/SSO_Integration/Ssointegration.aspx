<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ssointegration.aspx.cs" Inherits="Ssointegration" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<title>CMIS</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        Login();
    });

    function Login() {
        var SSSId = '<%= hdnSSOID.Value %>';
        if (SSSId != null && ssoId != '') {
            localStorage.setItem("SSOID", SSSId);
            window.location.href = '<%= hdnBaseUrl.Value %>';
        }
        else {
            if (confirm("Invalid User! Redirect to SSO?")) {

            }
           
        }
    }

    function ByPassLogin() {
        bypassSSObypassSSO
        if (bypassSSO != null && bypassSSO != '') {

        }
    }
</script>
</head>
<body>
<form id="form1" runat="server">
<asp:HiddenField ID="hdnSSOID" runat="server" Value="" />
<asp:HiddenField ID="hdnBaseUrl" runat="server" Value="" />
<%--        <asp:HiddenField ID="hdnSSOUserType" runat="server" Value="" />--%>
</form>
</body>
</html>
