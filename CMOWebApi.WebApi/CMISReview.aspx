<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CMISReview.aspx.cs" Inherits="CMOWebApi.WebAPI.CMISReview" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
          <div>
     <div>
     <div>
            <table>
                <tr>
                    <td>
                        <asp:TextBox ID="txtCode" runat="server" AutoPostBack="true" OnTextChanged="changed" ></asp:TextBox>
                    </td>
                </tr>
            </table>
            <div id="divID" runat="server" visible="false">
                <table width="100%">
                    <tr>
                        <td align="center" style="height: 109px">
                            <asp:TextBox ID="txtQuery" TextMode="MultiLine" runat="server" Height="85px" Width="810px"></asp:TextBox>
                        </td>
                    </tr>
                </table>
                <table width="100%">
                    <tr>
                        <td align="center">
                            <asp:RadioButton ID="rbtRRECL" runat="server" Checked="true" Text="RISL" GroupName="grp" /></td>
                        <td align="center"></td>
                    </tr>
                </table>
                <table width="100%">
                    <tr>
                        <td align="center">
                            <asp:Button Text="Execute" ID="btnQuery" runat="server" OnClick="btnQuery_Click" /></td>
                    </tr>
                </table>
                <table width="100%">
                    <tr>
                        <td align="center">
                            <asp:GridView ID="grdQuery" runat="server" AutoGenerateColumns="true"></asp:GridView>
                        </td>
                    </tr>
                </table>

                <table>
                    <tr>
                        <td>
                            <asp:Label ID="lblError" runat="server" ForeColor="red" Font-Bold="true"></asp:Label></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    </div>
    </form>
</body>
</html>
