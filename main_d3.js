function render() {
    const graph_box = d3.select('[js-sel="header_svg"]').node();
    const graph_width = graph_box.clientWidth;
    const graph_height = graph_box.clientHeight;
    const period_width_guess = 200;
    const iterations = Math.round(graph_width / period_width_guess);
    const period_width = graph_width / iterations;
    const wave_points = iterations * 8;


    const sine_wave = range(wave_points + 3).map(
        x => {
            const point_on_graph = graph_width * (x - 1) / wave_points;
            return [
                point_on_graph,
                (0.91 * graph_height) -  0.05 * graph_height * Math.cos(2 * Math.PI * (1 / period_width) * point_on_graph)]
        }
    );

    const shape_data = [
        [0, 0], // Top left

        ...sine_wave,

        [1 * graph_width, 0], // Top right
    ];

    const primary_selector = '[js-sel="header_shape"]';
    d3.select(primary_selector)
        .datum(shape_data)
        .attr("d",
            d3.line()
                .x(d => d[0])
                .y(d => d[1])
                .curve(d3.curveBasis)
        )
    ;

    const sine_wave_2 = range(wave_points + 3).map(
        x => {
            const point_on_graph = graph_width * (x - 1) / wave_points;
            return [
                point_on_graph,
                (0.96 * graph_height) -  0.05 * graph_height * Math.cos(2 * Math.PI * (1 / period_width) * point_on_graph + Math.PI  * 3 / 4)]
        }
    );

    const shape_data_2 = [
        [0, 0], // Top left

        ...sine_wave_2,

        [1 * graph_width, 0], // Top right
    ];

    const bg_selector = '[js-sel="bg_header_shape"]';
    d3.select(bg_selector)
        .datum(shape_data_2)
        .attr("d",
            d3.line()
                .x(d => d[0])
                .y(d => d[1])
                .curve(d3.curveBasis)
        )
    ;
}

run_on_load_or_immediately(render);
window.addEventListener('resize', render);
