package main.webapp.filter;

import com.sun.istack.internal.NotNull;
import main.webapp.entity.Query;
import main.webapp.log.Log;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "Params Filter", urlPatterns = {"/result"})
public class ParamsFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {

        @NotNull
        String pointX = req.getParameter("x");

        @NotNull
        String pointY = req.getParameter("y");

        @NotNull
        String radius = req.getParameter("radius");

        Log.log("Form params: [point x: {}], [point y: {}], [radius: {}]", pointX, pointY, radius);

        Query query = new Query(pointX, pointY, radius);

        req.setAttribute("query", query);

        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {
    }

}
