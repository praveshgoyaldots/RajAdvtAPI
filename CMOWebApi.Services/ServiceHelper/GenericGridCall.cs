using CMOWebApi.Data;
using CMOWebApi.Models.GeneralModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection;

namespace CMOWebApi.Services.ServiceHelper
{
    public class GenericGridCall<T> where T : class
    {
        //Get Data From Database By Passing name of table and other parameters.
        [Obsolete("This method is obsolete and not compatible with advance features.")]
        public static PagedData<T> ListView(int PageSize, Func<T, object> orderByColumn, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;
            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;
            DbSet<T> dbSet;
            Jankalyan_DBEntities dbContext = new Jankalyan_DBEntities();
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
        //Overloaded Function
        //Get Data From Database By Passing name of table and other parameters
        public static PagedData<T> ListView(int PageSize, Func<T, object> orderByColumn, Func<T, bool> filterCondition = null, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;

            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;
            DbSet<T> dbSet;
            Jankalyan_DBEntities dbContext = new Jankalyan_DBEntities();
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
                        listObj.Data = GetobjData(listObj.Data, t, query, PageSize, page, orderBy, false);
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
                                        typeDataTemp = assembly.GetType((prope.PropertyType).FullName).GetProperties();
                                    }
                                    break;
                                }
                                else if (prope.Name.ToLower() == propertiesDetails[i].ToLower())
                                {
                                    t = prope.PropertyType;
                                }
                            }
                        }
                        listObj.Data = GetobjData(listObj.Data, t, query, PageSize, page, orderBy, true);
                    }
                    else
                    {
                        if (data != null)
                        {
                            listObj.Data = query.OrderByDescending(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                        }
                        else
                        {
                            listObj.Data = query.Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                        }
                    }

                }
            }
            listObj.NumberOfPages = Convert.ToInt32(Math.Ceiling((double)query.Count() / PageSize));
            listObj.TotalRecords = query.Count();
            return listObj;
        }
        //Get Expression Based on type
        public static IEnumerable<T> GetobjData(IEnumerable<T> Data, Type t, IQueryable<T> query, int PageSize, int page, string orderBy, bool orderbydesc)
        {
            try
            {
                if (orderbydesc)
                {
                    if (t.Name.ToLower() == "boolean")
                        Data = query.OrderByDescending(QueryExtensions.GetExpression<T, bool>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                        Data = query.OrderByDescending(QueryExtensions.GetExpression<T, DateTime>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                        Data = query.OrderByDescending(QueryExtensions.GetExpression<T, decimal>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                        Data = query.OrderByDescending(QueryExtensions.GetExpression<T, long>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                        Data = query.OrderByDescending(QueryExtensions.GetExpression<T, int>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                }
                else
                {
                    if (t.Name.ToLower() == "boolean")
                        Data = query.OrderBy(QueryExtensions.GetExpression<T, bool>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("datetime"))
                        Data = query.OrderBy(QueryExtensions.GetExpression<T, DateTime>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("decimal"))
                        Data = query.OrderBy(QueryExtensions.GetExpression<T, decimal>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int64"))
                        Data = query.OrderBy(QueryExtensions.GetExpression<T, long>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                    else if (t.GenericTypeArguments[0].Name.ToLower().Contains("int"))
                        Data = query.OrderBy(QueryExtensions.GetExpression<T, int>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                }
            }
            catch
            {
                if (orderbydesc)
                {
                    Data = query.OrderByDescending(QueryExtensions.GetExpression<T, Object>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                }
                else
                {
                    Data = query.OrderBy(QueryExtensions.GetExpression<T, Object>(orderBy)).Skip(PageSize * (page - 1)).Take(PageSize).ToList();
                }
            }
            return Data;
        }
        //Get Data From StoreProcedure Make Sure SP should return data in IEnumerable Form or in Tabular form.
        public static PagedData<T> ListView(object[] parametersArrayForStoreProcedure, int PageSize, Func<T, object> orderByColumn, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;
            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;
            Jankalyan_DBEntities dbContext = new Jankalyan_DBEntities();
            var NameOfClass = typeof(T).Name;
            Type dbContextType = (typeof(Jankalyan_DBEntities));
            MethodInfo methodInfo = dbContextType.GetMethods().Where(x => x.Name == NameOfClass.Replace("_Result", "").ToString()).FirstOrDefault();
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
            listObj.TotalRecords = resultSetList.Count();
            return listObj;
        }

        //Get Data From Database By Passing name of table and other parameters
        public static IEnumerable<T> FilterData(Func<T, bool> filterCondition = null)
        {
            DbSet<T> dbSet;
            Jankalyan_DBEntities dbContext = new Jankalyan_DBEntities();
            dbSet = dbContext.Set<T>();
            IQueryable<T> query = dbSet;
            query = filterCondition != null ? query.Where(filterCondition).AsQueryable() : query;
            return query.ToList();
        }

        //Get Data From StoreProcedure Make Sure SP should return data in IEnumerable Form or in Tabular form.
        public static PagedData<T> SPListView(object[] parametersArrayForStoreProcedure, int PageSize, Func<T, object> orderByColumn, Func<T, bool> filterCondition = null, string filter = null, string orderBy = null, int orderByAsc = 1, int page = 1, bool IsSqlPaging = false, bool IsSqlSorting = false)
        {
            page = page == 0 ? 1 : page;
            PageSize = PageSize == 0 ? 1 : PageSize;
            Dictionary<string, string> values = null;
            values = filter != null ? JsonConvert.DeserializeObject<Dictionary<string, string>>(filter) : null;
            Jankalyan_DBEntities dbContext = new Jankalyan_DBEntities();
            var NameOfClass = typeof(T).Name;
            Type dbContextType = (typeof(Jankalyan_DBEntities));
            MethodInfo methodInfo = dbContextType.GetMethods().Where(x => x.Name == NameOfClass.Replace("_Result", "").ToString()).FirstOrDefault();
            ParameterInfo[] parameters = methodInfo.GetParameters();
            dynamic classInstance = Activator.CreateInstance(dbContextType, null);
            var result = parameters.Length == 0 ? methodInfo.Invoke(classInstance, null) : methodInfo.Invoke(classInstance, parametersArrayForStoreProcedure);
            IQueryable<T> query = ((IEnumerable<T>)result).AsQueryable();
            var listObj = new PagedData<T>();
            listObj.CurrentPage = page;
            query = filter != null ? QueryExtensions.Filter<T>(query, values) : query;
            var data = orderByColumn;
            data = orderBy != null ? QueryExtensions.GetOrderByExpression<T>(orderBy) : data;

            //For filter condition
            query = filterCondition != null ? query.Where(filterCondition).AsQueryable() : query;

            var resultSetList = query.AsEnumerable().ToList();

            listObj.Data = IsSqlPaging ?
                (IsSqlSorting ?
                    resultSetList.ToList() :
                    (orderByAsc == 1 ?
                        resultSetList.OrderBy(data).ToList() : resultSetList.OrderByDescending(data).ToList()))
                : (IsSqlSorting ?
                    (PageSize == 101 ?
                        resultSetList.ToList() : resultSetList.Skip(PageSize * (page - 1)).Take(PageSize).ToList())
                        : orderByAsc == 1 ?
                            (resultSetList.OrderBy(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList())
                            : (resultSetList.OrderByDescending(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()));

            //listObj.Data = PageSize == 101 ?  (orderByAsc == 1 ? (resultSetList.OrderBy(data).ToList()) : (resultSetList.OrderByDescending(data).ToList())) : (orderByAsc == 1 ? (resultSetList.OrderBy(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()) : (resultSetList.OrderByDescending(data).Skip(PageSize * (page - 1)).Take(PageSize).ToList()));

            listObj.NumberOfPages = Convert.ToInt32(Math.Ceiling((double)resultSetList.Count / PageSize));
            listObj.TotalRecords = resultSetList.Count();
            listObj.PageSize = PageSize;
            return listObj;
        }
    }
    public static class Pager
    {
        //if nuber of pages are more then 5 custom pager functionality will be call automatically
        public static int PagerStart = 5;
    }
}
