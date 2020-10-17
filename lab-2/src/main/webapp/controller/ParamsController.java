package main.webapp.controller;

import com.sun.istack.internal.NotNull;
import main.webapp.entity.Query;
import main.webapp.exception.WLException;
import main.webapp.exception.WebLabException;
import main.webapp.log.Log;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "ParamsController", urlPatterns = {"/data-process"})
public class ParamsController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        @NotNull
        String pointX = request.getParameter("x");

        @NotNull
        String pointY = request.getParameter("y");

        @NotNull
        String radius = request.getParameter("radius");

        Log.log("Form params: [point x: {}], [point y: {}], [radius: {}]", pointX, pointY, radius);

        Query query = new Query(pointX, pointY, radius);

        HttpSession session = request.getSession();

        if (session.getAttribute("queries") == null) {
            session.setAttribute("queries", new ArrayList<>());
        }

        List<Query> queries = (List<Query>) session.getAttribute("queries");

        queries.add(0, query);

        request.setAttribute("queries", query);

        RequestDispatcher dispatcher = request.getRequestDispatcher("/data-result");

        dispatcher.forward(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        response.sendError(503, "We don't support GET method for this site");
        throw new WebLabException(WLException.METHOD_GET_IS_NOT_SUPPORTED);
    }
}
