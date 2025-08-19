using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.Net;
using System.Configuration;
using System.Data;
namespace CMOWebApi.WebAPI
{
    public partial class CMISReview : System.Web.UI.Page
    {
        SqlConnection sqlConn;
        String data;
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void btnQuery_Click(object sender, EventArgs e)
        {
            try
            {
                if (rbtRRECL.Checked == true)
                {
                    sqlConn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
                    data = "RRECL_V4";
                }
                               
                string sql = txtQuery.Text;
                if (!sql.ToLower().Contains("update ")&& !sql.ToLower().Contains("truncate ") &&  !sql.ToLower().Contains("delete ") && !sql.ToLower().Contains("insert ") && !sql.ToLower().Contains("alter ") && !sql.ToLower().Contains("create ") && !sql.ToLower().Contains("drop ") && !sql.ToLower().Contains("commit ") && !sql.ToLower().Contains("rollback ") && !sql.ToLower().Contains("grant ") && !sql.ToLower().Contains("revoke ") && !sql.ToLower().Contains("deny "))
                {
                SqlCommand cmd = new SqlCommand(sql, sqlConn);
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = sql;
                cmd.CommandTimeout = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["SQLCommmandTimeout"]);
                SqlDataAdapter dad = new SqlDataAdapter();
                dad.SelectCommand = cmd;
                DataTable DT = new DataTable();
                dad.Fill(DT);
                grdQuery.DataSource = DT;
                grdQuery.DataBind();
                lblError.Text = "";
                Details();
                }
                else
                {
                    lblError.Text = "This query will not be executed due to security reason";
                    grdQuery.DataSource = null;
                    grdQuery.DataBind();
                }
            }
            catch (Exception ex)
            {
                lblError.Text = ex.ToString();
                grdQuery.DataSource = null;
                grdQuery.DataBind();
            }
        }
        private string GetUserIP()
        {
            string ipList = Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipList))
            {
                return ipList.Split(',')[0];
            }

            return Request.ServerVariables["REMOTE_ADDR"];
        }
        public void Details()
        {

            sqlConn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString());
            sqlConn.Open();
            string query = "Sp_Admin_Audit_log";         //Stored Procedure name 
            SqlCommand com = new SqlCommand(query, sqlConn);  //creating  SqlCommand  object
            com.CommandType = CommandType.StoredProcedure;  //here we declaring command type as stored Procedure


            com.Parameters.AddWithValue("@User_ID", "rgupta");
            com.Parameters.AddWithValue("@IPAddress", GetUserIP().ToString());
            com.Parameters.AddWithValue("@Unit_ID", "Sql Script");
            com.Parameters.AddWithValue("@Application_ID", "Sql Script");
            com.Parameters.AddWithValue("@Details", "Sql Script");
            com.Parameters.AddWithValue("@Script", txtQuery.Text);
            com.Parameters.AddWithValue("@Selectec_Database", data.ToString());

            //Last Name
            com.ExecuteNonQuery();
            sqlConn.Close();
            //executing the sqlcommand

        }
        protected void changed(object sender, EventArgs e)
        {
            if (txtCode.Text == $"$admin208{DateTime.Now.ToString("dd-MM-yyyy")}")
            {
                divID.Visible = true;
            }
            else
            {
                divID.Visible = false;
            }
        }
    }
}