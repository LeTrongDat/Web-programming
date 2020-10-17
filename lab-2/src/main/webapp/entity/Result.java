package main.webapp.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Result implements Serializable {
    private static final long serialVersionUID = 1475098483604448037L;

    private List<Query> queries;

    public Result() {

    }

    public List<Query> getQueries() {
        if (this.queries == null) {
            this.queries = new ArrayList<>();
        }
        return queries;
    }

    public void setQueries(List<Query> queries) {
        this.queries = queries;
    }
}
