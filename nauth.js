function attach() {
    setup_nauth_demo_animations();
    setup_nauth_drag_capabilities();
}

let _interval = null;


function start_nauth() {
    nauth_update_rows();
    _interval = setInterval(
        nauth_update_rows,
        15000
    );
}


function nauth_update_rows() {
    selectAll('.nauth-app-row span:last-of-type').forEach((nauth_row_span) => {
        const first = `000${getRandomInt(1000)}`.slice(-3);
        const second = `000${getRandomInt(1000)}`.slice(-3);
        nauth_row_span.innerText = `${first} ${second}`;
    });
}


function setup_nauth_demo_animations() {
    const app = d3.select('[js-select="nauth-app"]');
    const header = app.select('[js-select="nauth-header"]');
    const logo = app.select('[js-select="nauth-logo"]');
    const line = d3.line().x(d => d[0]).y(d => d[1]);
    const transition = d3.transition().duration(333).ease(d3.easeLinear);
    const path1 = [
        [19, 17],
        [310, 17],
        [310, 644],
        [19, 644],
        [19, 17],
    ];

    const path2 = [
        [19, 17],
        [310, 17],
        [310, 120],
        [19, 120],
        [19, 17],
    ];

    header
        .attr('d',
            line(path1)
        );

    app
        .on(
            'click',
            event => {
                logo
                    .transition(transition)
                    .attr('transform', 'translate(0, -240)')
                ;
                header
                    .transition(transition)
                    .attr('d', line(path2))
                ;
                start_nauth();
            },
            {'once': true},
        )
    ;
}


function setup_nauth_drag_capabilities() {
    const mfa_rows = select('[js-select="nauth-screen"] > foreignObject');
    let dragging = false;
    let start_pos = 0;
    let offset = 0;
    mfa_rows.addEventListener(
        'mousedown',
        event => {
            dragging = true;
            start_pos = event.clientY - offset;
        }
    );
    document.addEventListener(
        'mousemove',
        event => {
            if (dragging) {
                offset = Math.min(Math.max((event.clientY - start_pos), -150), 80);
                d3.select(mfa_rows).attr('transform', `translate(0, ${offset})`);
            }
        }
    );
    document.addEventListener(
        'mouseup',
        _ => {
            if (dragging) {
                dragging = false;
                const clamp = Math.min(Math.max((event.clientY - start_pos), -80), 0)
                d3.select(mfa_rows).transition().attr('transform', `translate(0, ${clamp})`);
                offset = clamp;
            }
        }
    );
    document.addEventListener(
        'selectstart',
        event => {
            if (dragging) {
                event.preventDefault();
            }
        }
    )
}


run_on_load_or_immediately(attach);
