/* jQuery Bracket | Copyright (c) Teijo Laine 2011-2016 | Licenced under the MIT licence */
var __extends = this && this.__extends || function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
};
! function(a) {
    function b(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function c() {
        this.message = "Root of information for this team", this.name = "EndOfBranchException"
    }

    function d(a) {
        function b(a, c) {
            return a instanceof Array ? b(a[0], c + 1) : c
        }
        return b(a, 0)
    }

    function e(a, b) {
        return b > 0 && (a = e([a], b - 1)), a
    }

    function f(b, c, d) {
        var e = d.find(".team[data-teamid=" + b + "]"),
            f = c ? c : "highlight";
        return {
            highlight: function() {
                e.each(function() {
                    a(this).addClass(f), a(this).hasClass("win") && a(this).parent().find(".connector").addClass(f)
                })
            },
            deHighlight: function() {
                e.each(function() {
                    a(this).removeClass(f), a(this).parent().find(".connector").removeClass(f)
                })
            }
        }
    }

    function g(b, c, d) {
        var e = d || c,
            g = e.winner(),
            h = e.loser();
        g && h && (g.name.isEmpty() || f(g.seed.get(), "highlightWinner", b).highlight(), h.name.isEmpty() || f(h.seed.get(), "highlightLoser", b).highlight()), b.find(".team").mouseover(function() {
            var c = a(this).attr("data-teamid");
            if (void 0 !== c) {
                var d = f(parseInt(c, 10), null, b);
                d.highlight(), a(this).mouseout(function() {
                    d.deHighlight(), a(this).unbind("mouseout")
                })
            }
        })
    }

    function h(b, c, d) {
        var e = a('<input type="text">');
        e.val(c), b.empty().append(e), e.focus(), e.blur(function() {
            d(e.val())
        }), e.keydown(function(a) {
            var b = a.keyCode || a.which;
            9 !== b && 13 !== b && 27 !== b || (a.preventDefault(), d(e.val(), 27 !== b))
        })
    }

    function i(a, b, c, d) {
        switch (d) {
            case "empty-bye":
                return void a.append("BYE");
            case "empty-tbd":
                return void a.append("TBD");
            case "entry-no-score":
            case "entry-default-win":
            case "entry-complete":
                return void a.append(b)
        }
    }

    function j(a) {
        var b = a.el,
            c = b.find(".team.win");
        c.append('<div class="bubble">1st</div>');
        var d = b.find(".team.lose");
        return d.append('<div class="bubble">2nd</div>'), !0
    }

    function k(a) {
        var b = a.el,
            c = b.find(".team.win");
        c.append('<div class="bubble third">3rd</div>');
        var d = b.find(".team.lose");
        return d.append('<div class="bubble fourth">4th</div>'), !0
    }

    function l(a, b, c, d, e) {
        for (var f, g = Math.log(2 * b.length) / Math.log(2), h = b.length, i = 0; i < g; i += 1) {
            f = a.addRound(u.empty());
            for (var l = 0; l < h; l += 1) {
                var m = 0 === i ? A(b, l) : null;
                if (i === g - 1 && c || i === g - 1 && e) {
                    var n = f.addMatch(m, u.of(j));
                    e || n.setAlignCb(B(n, d.skipConsolationRound))
                } else f.addMatch(m, u.empty())
            }
            h /= 2
        }
        if (c && (a.final().setConnectorCb(u.empty()), b.length > 1 && !d.skipConsolationRound)) {
            var o = a.final().getRound().prev(),
                p = o.map(function(a) {
                    return function() {
                        return a.match(0).loser()
                    }
                }).toNull(),
                q = o.map(function(a) {
                    return function() {
                        return a.match(1).loser()
                    }
                }).toNull(),
                r = f.addMatch(function() {
                    return [{
                        source: p
                    }, {
                        source: q
                    }]
                }, u.of(k));
            r.setAlignCb(function(b) {
                var c = a.el.height() / 2;
                r.el.css("height", c + "px");
                var e = b.height() / 2 + d.matchMargin;
                b.css("top", e + "px")
            }), r.setConnectorCb(u.empty())
        }
    }

    function m(a, b, c, d, e) {
        for (var f = Math.log(2 * c) / Math.log(2) - 1, g = c / 2, h = 0; h < f; h += 1) {
            for (var i = d && h === f - 1 ? 1 : 2, j = 0; j < i; j += 1)
                for (var l = b.addRound(u.empty()), m = 0; m < g; m += 1) {
                    var n = j % 2 !== 0 || 0 === h ? C(a, b, g, m, j, h) : null,
                        o = h === f - 1 && d,
                        p = l.addMatch(n, u.of(o ? k : null));
                    if (p.setAlignCb(D(p.el.find(".teamContainer"), p)), o) p.setConnectorCb(u.empty());
                    else if (h < f - 1 || j < 1) {
                        var q = j % 2 === 0 ? function(a, b) {
                            var c = a.height() / 4,
                                d = {
                                    height: 0,
                                    shift: 2 * c
                                };
                            return b.winner().order.map(function(a) {
                                return a.map(e ? d : {
                                    height: 0,
                                    shift: c
                                }, e ? d : {
                                    height: 2 * -c,
                                    shift: c
                                })
                            }).orElse(d)
                        } : null;
                        p.setConnectorCb(u.of(q))
                    }
                }
            g /= 2
        }
    }

    function n(a, b, c, d, e, f) {
        var g = a.addRound(u.empty()),
            h = g.addMatch(function() {
                return [{
                    source: function() {
                        return b.winner()
                    }
                }, {
                    source: function() {
                        return c.winner()
                    }
                }]
            }, u.of(function(e) {
                var g = !1;
                if (d.skipSecondaryFinal || e.winner().name.isEmpty() || e.winner().name !== c.winner().name) {
                    if (2 === a.size()) a.dropRound();
                    else if (a.size() > 2) throw new Error("Unexpected number of final rounds");
                    return j(e)
                }
                if (2 === a.size()) return !1;
                var h = function() {
                        var b = !e.winner().name.isEmpty() && e.winner().name === c.winner().name;
                        return g === !1 && b && (g = !0, f()), !b && g && (g = !1, a.dropRound(), f()), b
                    },
                    i = a.addRound(u.of(h)),
                    k = i.addMatch(function() {
                        return [{
                            source: function() {
                                return e.first()
                            }
                        }, {
                            source: function() {
                                return e.second()
                            }
                        }]
                    }, u.of(j));
                return e.setConnectorCb(u.of(function(a) {
                    return {
                        height: 0,
                        shift: a.height() / 2
                    }
                })), k.setConnectorCb(u.empty()), k.setAlignCb(function(a) {
                    var d = b.el.height() + c.el.height();
                    k.el.css("height", d + "px");
                    var e = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height();
                    a.css("top", e + "px")
                }), !1
            }));
        if (h.setAlignCb(function(a) {
                var e = b.el.height() + c.el.height();
                d.skipConsolationRound || (e /= 2), h.el.css("height", e + "px");
                var f = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height();
                a.css("top", f + "px")
            }), !d.skipConsolationRound) {
            var i = c.final().getRound().prev(),
                l = g.addMatch(function() {
                    return [{
                        source: function() {
                            return i.get().match(0).loser()
                        }
                    }, {
                        source: function() {
                            return c.loser()
                        }
                    }]
                }, u.of(k));
            l.setAlignCb(function(a) {
                var d = (b.el.height() + c.el.height()) / 2;
                l.el.css("height", d + "px");
                var e = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 + a.height() / 2 - d;
                a.css("top", e + "px")
            }), h.setConnectorCb(u.empty()), l.setConnectorCb(u.empty())
        }
        b.final().setConnectorCb(u.of(function(a) {
            var e = a.height() / 4,
                f = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height() / 2,
                g = f - b.el.height() / 2,
                h = b.winner().order.map(function(a) {
                    return a.map({
                        height: g + e * (d.centerConnectors ? 2 : 1),
                        shift: e * (d.centerConnectors ? 2 : 1)
                    }, {
                        height: g + e * (d.centerConnectors ? 2 : 0),
                        shift: e * (d.centerConnectors ? 2 : 3)
                    })
                }).orElse({
                    height: g + e * (d.centerConnectors ? 2 : 1),
                    shift: 2 * e
                }),
                i = h.height,
                j = h.shift;
            return i -= a.height() / 2, {
                height: i,
                shift: j
            }
        })), c.final().setConnectorCb(u.of(function(a) {
            var e = a.height() / 4,
                f = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height() / 2,
                g = f - b.el.height() / 2,
                h = c.winner().order.map(function(a) {
                    return a.map({
                        height: g + e * (d.centerConnectors ? 2 : 0),
                        shift: e * (d.centerConnectors ? 2 : 3)
                    }, {
                        height: g + 2 * e,
                        shift: e * (d.centerConnectors ? 2 : 1)
                    })
                }).orElse({
                    height: g + e * (d.centerConnectors ? 2 : 1),
                    shift: 2 * e
                }),
                i = h.height,
                j = h.shift;
            return i += a.height() / 2, {
                height: -i,
                shift: -j
            }
        }))
    }

    function o(b, c, d, e) {
        var f = c.height,
            g = c.shift,
            h = b / 2,
            i = !0;
        f < 0 && (i = !1, f = -f), f < 2 && (f = 0);
        var j = a('<div class="connector"></div>').appendTo(d);
        j.css("height", f), j.css("width", h + "px"), j.css(e, -h - 2 + "px"), g >= 0 ? j.css("top", g - 1 + "px") : j.css("bottom", -g - 1 + "px"), i ? j.css("border-bottom", "none") : j.css("border-top", "none");
        var k = a('<div class="connector"></div>').appendTo(j);
        return k.css("width", h + "px"), k.css(e, -h + "px"), i ? k.css("bottom", "0px") : k.css("top", "0px"), j
    }

    function p(a, b, c, d, e) {
        if (b) return Math.log(2 * a) / Math.log(2);
        if (c) return Math.max(2, 2 * (Math.log(2 * a) / Math.log(2) - 1) - 1);
        var f = !d && 3 === e.length && 2 === e[2].length;
        return 2 * (Math.log(2 * a) / Math.log(2) - 1) + 1 + (f ? 1 : 0)
    }

    function q(b) {
        var c = a.extend(!0, {}, b);
        return c.teams = c.teams.map(function(a) {
            return a.map(function(a) {
                return a.toNull()
            })
        }), c.results = c.results.map(function(a) {
            return a.map(function(a) {
                return a.map(function(a) {
                    var b = [a.first.toNull(), a.second.toNull()];
                    return void 0 !== a.userData && b.push(a.userData), b
                })
            })
        }), c
    }

    function r(c, d, e, f, g, h, i, j, k, l) {
        var m = e.name.isEmpty() || f.name.isEmpty() ? "" : 'data-resultid="result-' + j.getNext() + '"',
            n = a('<div class="score" style="width: ' + i.scoreWidth + 'px;" ' + m + "></div>"),
            o = e.name.isEmpty() || f.name.isEmpty() || !g ? u.empty() : e.score.map(function(a) {
                return "" + a
            }),
            p = o.orElse("--");
        n.text(p);
        var q = e.name.map(function() {
                return o.map(function() {
                    return "entry-complete"
                }).orElseGet(function() {
                    return f.emptyBranch() === t.BYE ? "entry-default-win" : "entry-no-score"
                })
            }).orElseGet(function() {
                var a = e.emptyBranch();
                switch (a) {
                    case t.BYE:
                        return "empty-bye";
                    case t.TBD:
                        return "empty-tbd";
                    default:
                        throw new Error("Unexpected branch type " + a)
                }
            }),
            r = a('<div class="team" style="width: ' + (i.teamWidth + i.scoreWidth) + 'px;"></div>'),
            s = a('<div class="label" style="width: ' + i.teamWidth + 'px;"></div>').appendTo(r);
        if (i.decorator.render(s, e.name.toNull(), p, q), e.seed.forEach(function(a) {
                r.attr("data-teamid", a)
            }), e.name.isEmpty() ? r.addClass("na") : d.winner().name === e.name ? r.addClass("win") : d.loser().name === e.name && r.addClass("lose"), r.append(n), (!e.name.isEmpty() || e.name.isEmpty() && 0 === c && h) && "function" == typeof i.save && (i.disableTeamEdit || (s.addClass("editable"), s.click(function() {
                function b() {
                    function f(f, g) {
                        var h = e.seed.get();
                        i.init.teams[~~(h / 2)][h % 2] = u.of(f || null), l(!0), d.click(b);
                        var j = i.el.find(".team[data-teamid=" + (h + 1) + "] div.label:first");
                        j.length && g === !0 && 0 === c && a(j).click()
                    }
                    d.unbind(), i.decorator.edit(d, e.name.toNull(), f)
                }
                var d = a(this);
                b()
            })), !e.name.isEmpty() && !f.name.isEmpty() && g)) {
            var w = j.get();
            n.addClass("editable"), n.click(function() {
                function c() {
                    d.unbind();
                    var f = b(e.score) ? d.text() : "0",
                        g = a('<input type="text">');
                    g.val(f), d.empty().append(g), g.focus().select(), g.keydown(function(c) {
                        b(a(this).val()) ? a(this).removeClass("error") : a(this).addClass("error");
                        var d = c.keyCode || c.which;
                        if (9 === d || 13 === d || 27 === d) {
                            if (c.preventDefault(), a(this).blur(), 27 === d) return;
                            var e = k.find("div.score[data-resultid=result-" + (w + 1) + "]");
                            e && e.click()
                        }
                    }), g.blur(function() {
                        var a = g.val();
                        a && b(a) || b(e.score) ? a && b(a) || !b(e.score) || (a = e.score) : a = "0", d.html(a), b(a) && (e.score = v.of(parseInt(a, 10)), l(!0)), d.click(c)
                    })
                }
                var d = a(this);
                c()
            })
        }
        return r
    }

    function s(b, c, d) {
        var e = a('<div class="tools"></div>').appendTo(b),
            f = a('<span class="increment">+</span>').appendTo(e);
        if (f.click(function() {
                for (var a = c.teams.length, b = 0; b < a; b += 1) c.teams.push([u.empty(), u.empty()]);
                return K(d)
            }), c.teams.length > 1 && 1 === c.results.length || c.teams.length > 2 && 3 === c.results.length) {
            var g = a('<span class="decrement">-</span>').appendTo(e);
            g.click(function() {
                if (c.teams.length > 1) return c.teams = c.teams.slice(0, c.teams.length / 2), K(d)
            })
        }
        if (1 === c.results.length && c.teams.length > 1) {
            var h = a('<span class="doubleElimination">de</span>').appendTo(e);
            h.click(function() {
                if (c.teams.length > 1 && c.results.length < 3) return c.results.push([], []), K(d)
            })
        } else if (3 === c.results.length && c.teams.length > 1) {
            var h = a('<span class="singleElimination">se</span>').appendTo(e);
            h.click(function() {
                if (3 === c.results.length) return c.results = c.results.slice(0, 1), K(d)
            })
        }
    }
    var t, u = function() {
            function a(b) {
                if (this.val = b, b instanceof a) throw new Error("Trying to wrap Option into an Option");
                if (void 0 === this.val) throw new Error("Option cannot contain undefined")
            }
            return a.of = function(b) {
                return new a(b)
            }, a.empty = function() {
                return new a(null)
            }, a.prototype.get = function() {
                if (null === this.val) throw new Error("Trying to get() empty Option");
                return this.val
            }, a.prototype.orElse = function(a) {
                return null === this.val ? a : this.val
            }, a.prototype.orElseGet = function(a) {
                return null === this.val ? a() : this.val
            }, a.prototype.map = function(b) {
                return null === this.val ? a.empty() : new a(b(this.val))
            }, a.prototype.forEach = function(a) {
                return null !== this.val && a(this.val), this
            }, a.prototype.toNull = function() {
                return null === this.val ? null : this.val
            }, a.prototype.isEmpty = function() {
                return null === this.val
            }, a
        }(),
        v = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return __extends(b, a), b.of = function(a) {
                var b = typeof a,
                    c = "number";
                if (null !== a && b !== c) throw new Error("Invalid score format, expected " + c + ", got " + b);
                return u.of(a)
            }, b.empty = function() {
                return u.empty()
            }, b
        }(u),
        w = function() {
            function a(a, b, c) {
                if (this.first = a, this.second = b, this.userData = c, !a || !b) throw new Error("Cannot create ResultObject with undefined scores")
            }
            return a
        }();
    ! function(a) {
        a[a.TBD = 0] = "TBD", a[a.BYE = 1] = "BYE"
    }(t || (t = {}));
    var x = function() {
            function a(a) {
                this.isFirst = a
            }
            return a.first = function() {
                return new a(!0)
            }, a.second = function() {
                return new a(!1)
            }, a.prototype.map = function(a, b) {
                return this.isFirst ? a : b
            }, a
        }(),
        y = function() {
            function a(a, b, c, d, e) {
                this.source = a, this.name = b, this.order = c, this.seed = d, this.score = e
            }
            return a.prototype.emptyBranch = function() {
                if (!this.name.isEmpty()) return t.TBD;
                try {
                    return this.source().emptyBranch()
                } catch (a) {
                    if (a instanceof c) return t.BYE;
                    throw new Error("Unexpected exception type")
                }
            }, a
        }(),
        z = function() {
            function a(a, b) {
                this.a = a, this.b = b
            }
            return a.teamsInResultOrder = function(a) {
                var b = a.a.name.isEmpty(),
                    c = a.b.name.isEmpty();
                if (c && !b) return a.b.emptyBranch() === t.BYE ? [a.a, a.b] : [];
                if (b && !c) return a.a.emptyBranch() === t.BYE ? [a.b, a.a] : [];
                if (!a.a.score.isEmpty() && !a.b.score.isEmpty()) {
                    if (a.a.score.get() > a.b.score.get()) return [a.a, a.b];
                    if (a.a.score.get() < a.b.score.get()) return [a.b, a.a]
                }
                return []
            }, a.emptyTeam = function(a) {
                return new y(a, u.empty(), u.empty(), u.empty(), v.empty())
            }, a.prototype.winner = function() {
                return a.teamsInResultOrder(this)[0] || a.emptyTeam(this.a.source)
            }, a.prototype.loser = function() {
                return a.teamsInResultOrder(this)[1] || a.emptyTeam(this.a.source)
            }, a
        }(),
        A = function(a, b) {
            return function() {
                return [{
                    source: function() {
                        return new y(function() {
                            throw new c
                        }, a[b][0], u.of(x.first()), u.of(2 * b), v.empty())
                    }
                }, {
                    source: function() {
                        return new y(function() {
                            throw new c
                        }, a[b][1], u.of(x.second()), u.of(2 * b + 1), v.empty())
                    }
                }]
            }
        },
        B = function(a, b) {
            return function(c) {
                c.css("top", ""), c.css("position", "absolute"), b ? c.css("top", a.el.height() / 2 - c.height() / 2 + "px") : c.css("bottom", -c.height() / 2 + "px")
            }
        },
        C = function(a, b, c, d, e, f) {
            return function() {
                if (e % 2 === 0 && 0 === f) return [{
                    source: function() {
                        return a.round(0).match(2 * d).loser()
                    }
                }, {
                    source: function() {
                        return a.round(0).match(2 * d + 1).loser()
                    }
                }];
                var g = f % 2 === 0 ? c - d - 1 : d;
                return [{
                    source: function() {
                        return b.round(2 * f).match(d).winner()
                    }
                }, {
                    source: function() {
                        return a.round(f + 1).match(g).loser()
                    }
                }]
            }
        },
        D = function(a, b) {
            return function() {
                return a.css("top", b.el.height() / 2 - a.height() / 2 + "px")
            }
        },
        E = function() {
            function b(b, c, d, e, f, g, h, i) {
                this.bracket = b, this.previousRound = c, this.roundNumber = d, this._results = e, this.doRenderCb = f, this.mkMatch = g, this.isFirstBracket = h, this.opts = i, this.containerWidth = this.opts.teamWidth + this.opts.scoreWidth, this.roundCon = a('<div class="round" style="width: ' + this.containerWidth + "px; margin-right: " + this.opts.roundMargin + 'px"/>'), this.matches = []
            }
            return Object.defineProperty(b.prototype, "el", {
                get: function() {
                    return this.roundCon
                },
                enumerable: !0,
                configurable: !0
            }), b.prototype.addMatch = function(a, b) {
                var c = this,
                    d = this.matches.length,
                    e = null !== a ? a() : [{
                        source: function() {
                            return c.bracket.round(c.roundNumber - 1).match(2 * d).winner()
                        }
                    }, {
                        source: function() {
                            return c.bracket.round(c.roundNumber - 1).match(2 * d + 1).winner()
                        }
                    }],
                    f = function() {
                        return e[0].source()
                    },
                    g = function() {
                        return e[1].source()
                    },
                    h = new z(new y(f, f().name, u.of(x.first()), f().seed, v.empty()), new y(g, g().name, u.of(x.second()), g().seed, v.empty())),
                    i = this.mkMatch(this, h, d, this._results.map(function(a) {
                        return void 0 === a[d] ? null : a[d]
                    }), b, this.isFirstBracket, this.opts);
                return this.matches.push(i), i
            }, b.prototype.match = function(a) {
                return this.matches[a]
            }, b.prototype.prev = function() {
                return this.previousRound
            }, b.prototype.size = function() {
                return this.matches.length
            }, b.prototype.render = function() {
                this.roundCon.empty(), (this.doRenderCb.isEmpty() || this.doRenderCb.get()()) && (this.roundCon.appendTo(this.bracket.el), this.matches.forEach(function(a) {
                    return a.render()
                }))
            }, b.prototype.results = function() {
                return this.matches.reduce(function(a, b) {
                    return a.concat([b.results()])
                }, [])
            }, b
        }(),
        F = function() {
            function a(a, b, c, d, e) {
                this.bracketCon = a, this.initResults = b, this.mkMatch = c, this.isFirstBracket = d, this.opts = e, this.rounds = []
            }
            return Object.defineProperty(a.prototype, "el", {
                get: function() {
                    return this.bracketCon
                },
                enumerable: !0,
                configurable: !0
            }), a.prototype.addRound = function(a) {
                var b = this.rounds.length,
                    c = b > 0 ? u.of(this.rounds[b - 1]) : u.empty(),
                    d = this.initResults.map(function(a) {
                        return void 0 === a[b] ? new w(v.empty(), v.empty(), void 0) : a[b]
                    }),
                    e = new E(this, c, b, d, a, this.mkMatch, this.isFirstBracket, this.opts);
                return this.rounds.push(e), e
            }, a.prototype.dropRound = function() {
                this.rounds.pop()
            }, a.prototype.round = function(a) {
                return this.rounds[a]
            }, a.prototype.size = function() {
                return this.rounds.length
            }, a.prototype.final = function() {
                return this.rounds[this.rounds.length - 1].match(0)
            }, a.prototype.winner = function() {
                return this.rounds[this.rounds.length - 1].match(0).winner()
            }, a.prototype.loser = function() {
                return this.rounds[this.rounds.length - 1].match(0).loser()
            }, a.prototype.render = function() {
                this.bracketCon.empty();
                for (var a = 0; a < this.rounds.length; a += 1) this.rounds[a].render()
            }, a.prototype.results = function() {
                return this.rounds.reduce(function(a, b) {
                    return a.concat([b.results()])
                }, [])
            }, a
        }(),
        G = function() {
            function a() {
                this.counter = 0
            }
            return a.prototype.get = function() {
                return this.counter
            }, a.prototype.getNext = function() {
                return ++this.counter
            }, a.prototype.reset = function() {
                this.counter = 0
            }, a
        }(),
        H = function() {
            function c(c, d, e, f, g, h, i, j, k, l) {
                if (this.round = c, this.match = d, this.seed = e, this.renderCb = g, this.isFirstBracket = h, this.opts = i, this.resultId = j, this.topCon = k, this.renderAll = l, this.connectorCb = u.empty(), this.matchCon = a('<div class="match"></div>'), this.teamCon = a('<div class="teamContainer"></div>'), this.alignCb = null, this.matchUserData = f.isEmpty() ? void 0 : f.get().userData, !i.save) {
                    var m = this.matchUserData;
                    i.onMatchHover && this.teamCon.hover(function() {
                        i.onMatchHover(m, !0)
                    }, function() {
                        i.onMatchHover(m, !1)
                    }), i.onMatchClick && this.teamCon.click(function() {
                        i.onMatchClick(m)
                    })
                }
                d.a.name = d.a.source().name, d.b.name = d.b.source().name, d.a.score = f.map(function(a) {
                    return a.first.toNull()
                }), d.b.score = f.map(function(a) {
                    return a.second.toNull()
                }), d.a.name && d.b.name || !b(d.a.score) && !b(d.b.score) || (console.log("ERROR IN SCORE DATA: " + d.a.source().name + ": " + d.a.score + ", " + d.b.source().name + ": " + d.b.score), d.a.score = d.b.score = v.empty())
            }
            return Object.defineProperty(c.prototype, "el", {
                get: function() {
                    return this.matchCon
                },
                enumerable: !0,
                configurable: !0
            }), c.prototype.getRound = function() {
                return this.round
            }, c.prototype.setConnectorCb = function(a) {
                this.connectorCb = a
            }, c.prototype.connect = function(a) {
                var b = this,
                    c = "lr" === this.opts.dir ? "right" : "left",
                    d = this.teamCon.height() / 4,
                    e = this.matchCon.height() / 2,
                    f = a.map(function(a) {
                        return a(b.teamCon, b)
                    }).orElseGet(function() {
                        return b.seed % 2 === 0 ? b.winner().order.map(function(a) {
                            return a.map({
                                shift: d * (b.opts.centerConnectors ? 2 : 1),
                                height: e
                            }, {
                                shift: d * (b.opts.centerConnectors ? 2 : 3),
                                height: e - d * (b.opts.centerConnectors ? 0 : 2)
                            })
                        }).orElse({
                            shift: 2 * d,
                            height: e - d * (b.opts.centerConnectors ? 0 : 1)
                        }) : b.winner().order.map(function(a) {
                            return a.map({
                                shift: -d * (b.opts.centerConnectors ? 2 : 3),
                                height: -e + d * (b.opts.centerConnectors ? 0 : 2)
                            }, {
                                shift: -d * (b.opts.centerConnectors ? 2 : 1),
                                height: -e
                            })
                        }).orElse({
                            shift: 2 * -d,
                            height: -e + d * (b.opts.centerConnectors ? 0 : 1)
                        })
                    });
                this.teamCon.append(o(this.opts.roundMargin, f, this.teamCon, c))
            }, c.prototype.winner = function() {
                return this.match.winner()
            }, c.prototype.loser = function() {
                return this.match.loser()
            }, c.prototype.first = function() {
                return this.match.a
            }, c.prototype.second = function() {
                return this.match.b
            }, c.prototype.setAlignCb = function(a) {
                this.alignCb = a
            }, c.prototype.render = function() {
                var a = this;
                this.matchCon.empty(), this.teamCon.empty(), this.match.a.name = this.match.a.source().name, this.match.b.name = this.match.b.source().name, this.match.a.seed = this.match.a.source().seed, this.match.b.seed = this.match.b.source().seed;
                var b = this.match.a.name.isEmpty() && this.match.b.name.isEmpty();
                b ? this.teamCon.addClass("np") : this.match.winner().name ? this.teamCon.removeClass("np") : this.teamCon.addClass("np");
                var c = !this.match.a.name.isEmpty() && !this.match.b.name.isEmpty();
                this.teamCon.append(r(this.round.roundNumber, this.match, this.match.a, this.match.b, c, this.isFirstBracket, this.opts, this.resultId, this.topCon, this.renderAll)), this.teamCon.append(r(this.round.roundNumber, this.match, this.match.b, this.match.a, c, this.isFirstBracket, this.opts, this.resultId, this.topCon, this.renderAll)), this.matchCon.appendTo(this.round.el), this.matchCon.append(this.teamCon), this.el.css("height", this.round.bracket.el.height() / this.round.size() + "px"), this.teamCon.css("top", this.el.height() / 2 - this.teamCon.height() / 2 + "px"), null !== this.alignCb && this.alignCb(this.teamCon);
                var d = this.renderCb.map(function(b) {
                    return b(a)
                }).orElse(!1);
                d || this.connect(this.connectorCb)
            }, c.prototype.results = function() {
                var a = this.match.a.name.isEmpty() || this.match.b.name.isEmpty();
                return a && (this.match.a.score = this.match.b.score = v.empty()), new w(this.match.a.score, this.match.b.score, this.matchUserData)
            }, c
        }(),
        I = function(a) {
            return void 0 === a ? null : a
        },
        J = function(a) {
            return a.map(function(a) {
                return a.map(function(a) {
                    return a.map(function(a) {
                        return new w(v.of(I(a[0])), v.of(I(a[1])), a[2])
                    })
                })
            })
        },
        K = function(b) {
            function c() {
                var a = p(j.teams.length, k, b.skipGrandFinalComeback, b.skipSecondaryFinal, j.results);
                b.disableToolbar ? r.css("width", a * (b.teamWidth + b.scoreWidth + b.roundMargin) + 10) : r.css("width", a * (b.teamWidth + b.scoreWidth + b.roundMargin) + 40), k && j.teams.length <= 2 && !b.skipConsolationRound && r.css("height", o + 40)
            }

            function d(a) {
                i.reset(), e.render(), f && f.render(), h && !b.skipGrandFinalComeback && h.render(), b.disableHighlight || g(r, e, h), a && (j.results[0] = e.results(), f && (j.results[1] = f.results()), h && !b.skipGrandFinalComeback && (j.results[2] = h.results()), c(), b.save && b.save(q(j), b.userData))
            }
            var e, f, h, i = new G,
                j = b.init,
                k = j.results.length <= 1,
                o = 45 * j.teams.length + j.teams.length * b.matchMargin,
                r = a('<div class="jQBracket ' + b.dir + '"></div>').appendTo(b.el.empty());
            b.skipSecondaryFinal && k && a.error("skipSecondaryFinal setting is viable only in double elimination mode"), b.disableToolbar || s(r, j, b);
            var t, v, w;
            k ? v = a('<div class="bracket"></div>').appendTo(r) : (b.skipGrandFinalComeback || (t = a('<div class="finals"></div>').appendTo(r)), v = a('<div class="bracket"></div>').appendTo(r), w = a('<div class="loserBracket"></div>').appendTo(r)), v.css("height", o), w && w.css("height", v.height() / 2), c();
            var x = function(a, b, c, e, f, g, h) {
                return new H(a, b, c, e, f, g, h, i, r, d)
            };
            return e = new F(v, u.of(j.results[0] || null), x, !0, b), k || (f = new F(w, u.of(j.results[1] || null), x, !1, b), b.skipGrandFinalComeback || (h = new F(t, u.of(j.results[2] || null), x, !1, b))), l(e, j.teams, k, b, b.skipGrandFinalComeback && !k), k || (m(e, f, j.teams.length, b.skipGrandFinalComeback, b.centerConnectors), b.skipGrandFinalComeback || n(h, e, f, b, r, c)), d(!1), {
                data: function() {
                    return q(b.init)
                }
            }
        },
        L = function(a, b) {
            if (a.hasOwnProperty(b)) {
                var c = "number",
                    d = typeof a[b];
                if (d !== c) throw new Error('Option "' + b + '" is ' + d + " instead of " + c)
            }
        },
        M = function(a, b) {
            var c = a[b],
                d = "boolean",
                e = typeof c;
            if (e !== d) throw new Error("Value of " + b + " must be boolean, got " + d + ", got " + e)
        },
        N = function(a, b, c) {
            var d = b[c];
            if (d < a) throw new Error("Value of " + c + " must be greater than " + a + ", got " + d)
        },
        O = function(a) {
            return a & a - 1
        },
        P = {
            init: function(b) {
                var c = a.extend(!0, {}, b);
                if (!c) throw Error("Options not set");
                if (!c.init && !c.save) throw Error("No bracket data or save callback given");
                if (void 0 === c.userData && (c.userData = null), !(!c.decorator || c.decorator.edit && c.decorator.render)) throw Error("Invalid decorator input");
                c.decorator || (c.decorator = {
                    edit: h,
                    render: i
                }), c.init || (c.init = {
                    teams: [
                        [u.empty(), u.empty()]
                    ],
                    results: []
                });
                var f = this;
                c.el = this, c.save && (c.onMatchClick || c.onMatchHover) && a.error("Match callbacks may not be passed in edit mode (in conjunction with save callback)");
                var g = typeof c.disableToolbar,
                    j = c.hasOwnProperty("disableToolbar");
                j && "boolean" !== g && a.error("disableToolbar must be a boolean, got " + g), !c.save && j && a.error('disableToolbar can be used only if the bracket is editable, i.e. "save" callback given'), j || (c.disableToolbar = void 0 === c.save);
                var k = typeof c.disableTeamEdit,
                    l = c.hasOwnProperty("disableTeamEdit");
                l && "boolean" !== k && a.error("disableTeamEdit must be a boolean, got " + k), !c.save && l && a.error('disableTeamEdit can be used only if the bracket is editable, i.e. "save" callback given'), l || (c.disableTeamEdit = !1), !c.disableToolbar && c.disableTeamEdit && a.error('disableTeamEdit requires also resizing to be disabled, initialize with "disableToolbar: true"');
                var m = e(c.init.results, 4 - d(c.init.results));
                c.init.results = J(m), L(c, "teamWidth"), L(c, "scoreWidth"), L(c, "roundMargin"), L(c, "matchMargin"), c.hasOwnProperty("teamWidth") || (c.teamWidth = 70), c.hasOwnProperty("scoreWidth") || (c.scoreWidth = 30), c.hasOwnProperty("roundMargin") || (c.roundMargin = 40), c.hasOwnProperty("matchMargin") || (c.matchMargin = 20), N(0, c, "teamWidth"), N(0, c, "scoreWidth"), N(0, c, "roundMargin"), N(0, c, "matchMargin"), c.hasOwnProperty("centerConnectors") || (c.centerConnectors = !1), M(c, "centerConnectors"), c.hasOwnProperty("disableHighlight") || (c.disableHighlight = !1), M(c, "disableHighlight");
                var n = O(c.init.teams.length);
                n !== Math.floor(n) && a.error('"teams" property must have 2^n number of team pairs, i.e. 1, 2, 4, etc. Got ' + c.init.teams.length + " team pairs."), c.dir = c.dir || "lr", c.init.teams = c.init.teams && 0 !== c.init.teams.length ? c.init.teams : [
                    [null, null]
                ], c.init.teams = c.init.teams.map(function(a) {
                    return a.map(function(a) {
                        return null === a ? u.empty() : u.of(a)
                    })
                }), c.skipConsolationRound = c.skipConsolationRound || !1, c.skipSecondaryFinal = c.skipSecondaryFinal || !1, "lr" !== c.dir && "rl" !== c.dir && a.error('Direction must be either: "lr" or "rl"');
                var o = K(c);
                return a(this).data("bracket", {
                    target: f,
                    obj: o
                }), o
            },
            data: function() {
                var b = a(this).data("bracket");
                return b.obj.data()
            }
        };
    a.fn.bracket = function(b) {
        return P[b] ? P[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.bracket") : P.init.apply(this, arguments)
    }
}(jQuery);