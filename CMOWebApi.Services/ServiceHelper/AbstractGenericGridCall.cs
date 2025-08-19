using CMOWebApi.Models.GeneralModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.ServiceHelper
{
    public class AbstractGenericGridCall<T, TEntityDbContext>
        where T : class, new()
        where TEntityDbContext : class
    {
        //Get Data From Database By Passing name of table and other parameters.
        public static PagedData<T> ListView(int PageSize, Func<T, object> orderByColumn, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;
            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;
            DbSet<T> dbSet;
            Type dbtype = typeof(TEntityDbContext);
            dynamic dbContext = Activator.CreateInstance(dbtype, null);
            //CMOWebApiEntities dbContext = new CMOWebApiEntities();
            dbSet = dbContext.Set<T>();
            IQueryable<T> query = dbSet;
            var listObj = new PagedData<T>();
            listObj.CurrentPage = page;
            query = filter != null ? QueryExtensions.Filter<T>(query, values) : query;
            var data = orderByColumn;
            data = orderBy != null ? QueryExtensions.GetOrderByExpression<T>(orderBy) : data;
            listObj.Data = PageSize == 101 ? (orderByAsc == 1 ? (query.OrderBy(data).ToList()) : (query.OrderByDescending(data).ToList())) : (orderByAsc == 1 ? (query.OrderBy(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()) : (query.OrderByDescending(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()));
            listObj.NumberOfPages = Convert.ToInt32(Math.Ceiling((double)query.Count() / PageSize));
            return listObj;
        }
        //Overloaded Method
        //Get Data From Database By Passing name of table and other parameters
        public static PagedData<T> ListView(int PageSize, Func<T, object> orderByColumn, Func<T, bool> filterCondition = null, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;

            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;
            DbSet<T> dbSet;
            Type dbtype = typeof(TEntityDbContext);
            dynamic dbContext = Activator.CreateInstance(dbtype, null);
            //CMOWebApiEntities dbContext = new CMOWebApiEntities();
            dbSet = dbContext.Set<T>();
            IQueryable<T> query = dbSet;
            var listObj = new PagedData<T>();
            listObj.CurrentPage = page;
            query = filter != null ? QueryExtensions.Filter<T>(query, values) : query;
            var data = orderByColumn;
            if (orderBy != null)
            {
                if (!orderBy.Contains("."))
                    data = QueryExtensions.GetOrderByExpression<T>(orderBy);
            }
            query = filterCondition != null ? query.Where(filterCondition).AsQueryable() : query;

            if (PageSize == 101)
            {
                listObj.Data = orderByAsc == 1 ? (query.OrderBy(data).ToList()) : (query.OrderByDescending(data).ToList());
            }
            else
            {
                if (orderByAsc == 1)
                {
                    if (orderBy != null && orderBy.Contains('.'))
                    {
                        Assembly assembly = Assembly.GetAssembly(typeof(T));
                        Type typeData = typeof(T);
                        var typeDataTemp = typeData.GetProperties();
                        var propertiesDetails = orderBy.Split('.');
                        Type t = (dynamic)null;

                        for (int i = 0; i <= propertiesDetails.Length - 1; i++)
                        {
                            foreach (PropertyInfo prope in typeDataTemp)
                            {
                                if (prope.Name.ToLower() == propertiesDetails[i].ToLower() && prope.PropertyType.IsClass)
                                {
                                    if (assembly.GetType(((prope.PropertyType)).FullName) != null)
                                    {
                                        typeDataTemp = assembly.GetType(((prope.PropertyType)).FullName).GetProperties();
                                        break;
                                    }
                                }
                                else if (prope.Name.ToLower() == propertiesDetails[i].ToLower())
                                {
                                    t = prope.PropertyType;
                                }
                            }
                        }
                        try
                        {
                            if (t.Name.ToLower() == "boolean")
                                listObj.Data = query.OrderBy(QueryExtensions.GetExpression<T, bool>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                                listObj.Data = query.OrderBy(QueryExtensions.GetExpression<T, DateTime>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                                listObj.Data = query.OrderBy(QueryExtensions.GetExpression<T, decimal>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                                listObj.Data = query.OrderBy(QueryExtensions.GetExpression<T, long>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                                listObj.Data = query.OrderBy(QueryExtensions.GetExpression<T, int>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                        }
                        catch
                        {
                            listObj.Data = query.OrderBy(QueryExtensions.GetExpression<T, Object>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                        }
                    }
                    else
                    {
                        listObj.Data = query.OrderBy(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    }
                }
                else
                {
                    if (orderBy != null && orderBy.Contains('.'))
                    {

                        Assembly assembly = Assembly.GetAssembly(typeof(T));
                        Type typeData = typeof(T);
                        var typeDataTemp = typeData.GetProperties();
                        var propertiesDetails = orderBy.Split('.');
                        Type t = (dynamic)null;

                        for (int i = 0; i <= propertiesDetails.Length - 1; i++)
                        {
                            foreach (PropertyInfo prope in typeDataTemp)
                            {
                                if (prope.Name.ToLower() == propertiesDetails[i].ToLower() && prope.PropertyType.IsClass)
                                {
                                    if (assembly.GetType(((prope.PropertyType)).FullName) != null)
                                    {
                                        typeDataTemp = assembly.GetType(((prope.PropertyType)).FullName).GetProperties();
                                    }
                                    break;
                                }
                                else if (prope.Name.ToLower() == propertiesDetails[i].ToLower())
                                {
                                    t = prope.PropertyType;
                                }
                            }
                        }
                        try
                        {
                            if (t.Name.ToLower() == "boolean")
                                listObj.Data = query.OrderByDescending(QueryExtensions.GetExpression<T, bool>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                                listObj.Data = query.OrderByDescending(QueryExtensions.GetExpression<T, DateTime>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                                listObj.Data = query.OrderByDescending(QueryExtensions.GetExpression<T, decimal>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                                listObj.Data = query.OrderByDescending(QueryExtensions.GetExpression<T, long>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                            else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                                listObj.Data = query.OrderByDescending(QueryExtensions.GetExpression<T, int>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                        }
                        catch
                        {
                            listObj.Data = query.OrderByDescending(QueryExtensions.GetExpression<T, Object>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                        }
                    }
                    else
                    {
                        listObj.Data = query.OrderByDescending(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    }

                }
            }
            listObj.NumberOfPages = Convert.ToInt32(Math.Ceiling((double)query.Count() / PageSize));
            return listObj;
        }
        //Get Data From StoreProcedure Make Sure SP should return data in IEnumerable Form or in Tabular form.
        public static PagedData<T> ListView(object[] parametersArrayForStoreProcedure, int PageSize, Func<T, object> orderByColumn, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;
            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;

            //CMOWebApiEntities dbContext = new CMOWebApiEntities();
            var NameOfClass = typeof(T).Name;

            Type dbContextType = typeof(TEntityDbContext);
            //dynamic dbContext = Activator.CreateInstance(dbtype, null);

            //Type dbContextType = (typeof(CMOWebApiEntities));
            MethodInfo methodInfo = dbContextType.GetMethods().Where(x => x.Name == NameOfClass.Split('_')[0].ToString()).FirstOrDefault();
            ParameterInfo[] parameters = methodInfo.GetParameters();
            dynamic classInstance = Activator.CreateInstance(dbContextType, null);
            var result = parameters.Length == 0 ? methodInfo.Invoke(classInstance, null) : methodInfo.Invoke(classInstance, parametersArrayForStoreProcedure);
            IQueryable<T> query = ((IEnumerable<T>)result).AsQueryable();
            var listObj = new PagedData<T>();
            listObj.CurrentPage = page;
            query = filter != null ? QueryExtensions.Filter<T>(query, values) : query;
            var data = orderByColumn;
            data = orderBy != null ? QueryExtensions.GetOrderByExpression<T>(orderBy) : data;
            var resultSetList = query.ToList();
            listObj.Data = PageSize == 101 ? (orderByAsc == 1 ? (resultSetList.OrderBy(data).ToList()) : (resultSetList.OrderByDescending(data).ToList())) : (orderByAsc == 1 ? (resultSetList.OrderBy(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()) : (resultSetList.OrderByDescending(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()));
            listObj.NumberOfPages = Convert.ToInt32(Math.Ceiling((double)resultSetList.Count / PageSize));
            return listObj;
        }
    }
}
